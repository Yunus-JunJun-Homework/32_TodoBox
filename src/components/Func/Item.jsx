import React from "react";

export const Item = (props) => {
  return (
    <>
      <div>
        <div className="row">
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={props.onRemove(props.task.itemId)}
            >
              -
            </button>
          </div>
          <div className="col">{props.task.task}</div>
        </div>
        <hr />
      </div>
    </>
  );
};
