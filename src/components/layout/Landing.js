import React from "react";
import logo from "../../logo.svg";

const Landing = ({ user, loading }) => {
  // console.log("User from the landing: ", user);
  return (
    <div className="container">
      {/* About */}
      <div className="card">
        <div className="card-header">
          <h4>About</h4>
        </div>
        <div className="card-body">
          <h6>Description</h6>
          <p>This entails the idea of living your life one dy at a time.</p>
          <p>
            It states that a successfull life is one which comproses of
            successfull months, weeks and days. A successfull day is one that
            its activities have contributed possitively to the attainment of a
            goal.
          </p>
          <p>
            Therefore one should just focus on living each day successfully.
            This is done by Setting a specific goal to achive in life. Determine
            the set of activities that have to be done everyday inorder to
            realise that goal.
          </p>
          <p>
            Inorder of priority, one should list activities to be done tommorow.
          </p>
          <p>
            if tommorow comes, look at the number activity on the list, start
            with that and do only that activity and successfully finished.
          </p>
          <p>
            This will help one develop a successfull habit on doing tasks
            successfully, which in tern will turn into successfull life
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
