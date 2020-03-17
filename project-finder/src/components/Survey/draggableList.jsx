import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SurveyButton from './surveyButton';


const reinsert = (arr, from, to) => {
  console.log(arr, from, to);
  const output = arr.slice(0);
  const val = output[from];
  output.splice(from, 1);
  output.splice(to, 0, val);
  return output;
};

const DragHandle = SortableHandle(() => <span>::</span>);

const SortableItem = SortableElement(({ value }) => {
  const content = (
    <div>
      <DragHandle />
      {value}
    </div>
  );

  return (
    <SurveyButton content={content} />
  );
});

const SortableList = SortableContainer(({ items }) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem key={`item-${value}`} index={index} value={value} />
    ))}
  </ul>
));

const DraggableList = ({ initialList }) => {
  const [list, setList] = useState(initialList);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setList(reinsert(list, oldIndex, newIndex));
  };

  return (
    <SortableList
      items={list}
      onSortEnd={onSortEnd}
      shouldCancelStart={() => null}
    />
  );
};

DraggableList.propTypes = {
  initialList: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default DraggableList;
