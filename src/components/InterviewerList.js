import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList(props) {


  const { value, onChange } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((el) => {
          return (
            <InterviewerListItem 
              key = {el.id}
              name = {el.name}
              avatar = {el.avatar}
              onChange = {() => onChange(el.id)}
              selected = {value === el.id}
            />
          )
        })}
      </ul>
    </section>
  );

}
