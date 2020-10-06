import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Grid.css';

function Grid(props) {
  const { items, fetchData, hasMore, renderer } = props;
  return (
    <div className="Grid">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore()}
        loader={<h4>Loading...</h4>}
      >
        {items.map(renderer)}
      </InfiniteScroll>
    </div>
  );
}

export default Grid;
