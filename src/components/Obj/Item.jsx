import React from "react";

class Item extends React.Component {
  render() {
    const { task, onRemove } = this.props;

    return (
      <>
        <div className="row">
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onRemove(task.id)}
            >
              -
            </button>
          </div>
          <div className="col">{task.content}</div>
        </div>
        <hr />
      </>
    );
  }
}

export default Item;
