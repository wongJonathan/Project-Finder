import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SurveyButton from './surveyButton';
import './draggableList.sass';

const reinsert = (arr, from, to) => {
  const output = arr.slice(0);
  const val = output[from];
  output.splice(from, 1);
  output.splice(to, 0, val);
  return output;
};

const DragHandle = SortableHandle(() => <img className="draggable-handle" src="/images/threeDots.svg" alt="" />);

const SortableItem = SortableElement(({ value }) => {
  const content = (
    <div className="draggable-item">
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

const DraggableList = ({ initialList, onChange }) => {
  const [list, setList] = useState(initialList);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newList = reinsert(list, oldIndex, newIndex);
    setList(newList);
    onChange(newList);
  };

  return (
    <div className="draggable">
      <div className="draggable-pos">
        {list.map((_, index) => (
          <div className="draggable-pos-box">
            {`0${index + 1}`}
          </div>
        ))}
      </div>
      <SortableList
        items={list}
        onSortEnd={onSortEnd}
        shouldCancelStart={() => null}
      />
    </div>
  );
};

DraggableList.propTypes = {
  initialList: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onChange: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default DraggableList;
