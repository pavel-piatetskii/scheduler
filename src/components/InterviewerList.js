import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {
  const { interviewer, setInterviewer } = props
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((el) => {

          el.selected = interviewer === el.id;
          el.setInterviewer = setInterviewer;
          return InterviewerListItem(el)
        }) }
      </ul>
    </section>
  );

}