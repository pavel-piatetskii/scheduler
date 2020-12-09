import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const { onChange, day } = props
  return (
  <ul>
    {props.days.map(el => {
      return (
      <DayListItem 
        key = {el.id}
        name = {el.name}
        spots = {el.spots}
        onChange = {() => onChange(el.name)}
        selected = {day === el.name}
      />
      )
    })};
  </ul>
  );

}