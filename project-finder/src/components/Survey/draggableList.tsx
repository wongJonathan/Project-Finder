import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortEnd,
} from 'react-sortable-hoc';
import React, { ReactElement, useState } from 'react';

import SurveyButton from './surveyButton';
import './draggableList.sass';

type listType = string[] | number[];

interface DraggableListProps {
  initialList: listType;
  onChange: (newList: listType) => void;
}

const reinsert = (arr: listType, from: number, to: number) => {
  const output = arr.slice(0);
  const val: string | number = output[from];
  output.splice(from, 1);
  if (typeof val === 'string') {
    output.splice(to, 0, val);
  } else if (typeof val === 'number') {
    output.splice(to, 0, val);
  }
  return output;
};

const DragHandle = SortableHandle(() => <img className="draggable-handle" src="/images/threeDots.svg" alt="" />);

const SortableItem = SortableElement(({ value }: {value: string | number }) => {
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

const SortableList = SortableContainer(({ items }: { items: listType }) => (
  <ul>
    {(items as Array<string | number>).map((value: string | number, index: number) => (
      <SortableItem key={`item-${value}`} index={index} value={value} />
    ))}
  </ul>
));

const DraggableList = ({ initialList, onChange }: DraggableListProps): ReactElement => {
  const [list, setList] = useState<listType>(initialList);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const newList = reinsert(list, oldIndex, newIndex);
    setList(newList);
    onChange(newList);
  };

  return (
    <div className="draggable">
      <div className="draggable-pos">
        {(list as Array<string | number>).map((name: string | number, index: number) => (
          <div key={`${name}'s index`} className="draggable-pos-box">
            {`0${index + 1}`}
          </div>
        ))}
      </div>
      <SortableList
        items={list}
        onSortEnd={onSortEnd}
        shouldCancelStart={() => false}
      />
    </div>
  );
};

export default DraggableList;
