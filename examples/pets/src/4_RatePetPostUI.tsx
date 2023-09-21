import { useParams } from "react-router";
import { CoID, Queried } from "cojson";
import { useSyncedQuery } from "jazz-react";

import { PetPost, ReactionType, REACTION_TYPES, PetReactions } from "./1_types";

import { ShareButton } from "./components/ShareButton";
import { Button, Skeleton } from "./basicComponents";
import { useLoadImage } from "jazz-react-media-images";
import uniqolor from "uniqolor";

/** Walkthrough: TODO
 */

const reactionEmojiMap: { [reaction in ReactionType]: string } = {
    aww: "😍",
    love: "❤️",
    haha: "😂",
    wow: "😮",
    tiny: "🐥",
    chonkers: "🐘",
};

export function RatePetPostUI() {
    const petPostID = useParams<{ petPostId: CoID<PetPost> }>().petPostId;

    const petPost = useSyncedQuery(petPostID);
    const petImage = useLoadImage(petPost?.image);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">{petPost?.name}</h1>
                <ShareButton petPost={petPost} />
            </div>

            {petImage && (
                <img
                    className="w-80 max-w-full rounded"
                    src={petImage.highestResSrc || petImage.placeholderDataURL}
                />
            )}

            <div className="flex justify-between max-w-xs flex-wrap">
                {REACTION_TYPES.map((reactionType) => (
                    <Button
                        key={reactionType}
                        variant={
                            petPost?.reactions?.me?.last === reactionType
                                ? "default"
                                : "outline"
                        }
                        onClick={() => {
                            petPost?.reactions?.push(reactionType);
                        }}
                        title={`React with ${reactionType}`}
                        className="text-2xl px-2"
                    >
                        {reactionEmojiMap[reactionType]}
                    </Button>
                ))}
            </div>

            {petPost?.group.myRole() === "admin" && petPost.reactions && (
                <ReactionOverview petReactions={petPost.reactions} />
            )}
        </div>
    );
}

function ReactionOverview({
    petReactions,
}: {
    petReactions: Queried<PetReactions>;
}) {
    return (
        <div>
            <h2>Reactions</h2>
            <div className="flex flex-col gap-1">
                {REACTION_TYPES.map((reactionType) => {
                    const reactionsOfThisType = Object.values(
                        petReactions.perAccount
                    ).filter(({ last }) => last === reactionType);

                    if (reactionsOfThisType.length === 0) return null;

                    return (
                        <div
                            className="flex gap-2 items-center"
                            key={reactionType}
                        >
                            {reactionEmojiMap[reactionType]}{" "}
                            {reactionsOfThisType.map((reaction, idx) =>
                                reaction.by?.profile?.name ? (
                                    <span
                                        className="rounded-full py-0.5 px-2 text-xs"
                                        style={uniqueColoring(reaction.by.id)}
                                        key={reaction.by.id}
                                    >
                                        {reaction.by.profile.name}
                                    </span>
                                ) : (
                                    <Skeleton
                                        className="mt-1 w-[50px] h-[1em] rounded-full"
                                        key={idx}
                                    />
                                )
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function uniqueColoring(seed: string) {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return {
        color: uniqolor(seed, { lightness: darkMode ? 80 : 20 }).color,
        background: uniqolor(seed, { lightness: darkMode ? 20 : 80 }).color,
    };
}
