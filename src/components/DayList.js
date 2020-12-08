import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const { setDay, day } = props
  return (
  <ul>
    {props.days.map(el => {
      const { id, name, spots } = el;

      const selected = day === el.name;
      return DayListItem({ id, name, spots, setDay, selected })
    })};
  </ul>
  );

}