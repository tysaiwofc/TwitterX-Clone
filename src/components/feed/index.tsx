"use client";

import FeedAllPostLoading from "./FeedAllPostLoading";
import FeedCategorie from "./FeedCategorie";
import FeedPost from "./FeedPost";

const Feed = () => {
  return (
    <div className="bg-black flex-grow overflow-hidden border-r-[0.5px] border-r-[#333333]">
      {/* Sticky header that stays within the Feed's width */}
      <div className="sticky top-0 flex flex-row w-full border-b-[0.5px] border-b-[#333333] h-14 bg-black z-10">
        <FeedCategorie name="For you" href="/" />
        <FeedCategorie name="Following" href="/following" />
      </div>

      {/* Container for the feed content with overflow */}
      <div className="overflow-y-auto h-[calc(100vh-56px)]"> {/* Adjust height accordingly */}
        <FeedAllPostLoading />
      </div>
    </div>
  );
};

export default Feed;
