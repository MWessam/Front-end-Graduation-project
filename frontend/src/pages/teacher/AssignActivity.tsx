import '../../styles/teacher/assign-activity.css';

const AssignActivity = () => {
  return (
    <div className="page-content">
        <div className="page-header">
            <h1 className="page-title">Assign Activity</h1>
        </div>
        <div className="activity-form-container">
            <form>
                <div className="form-group">
                    <label>Activity Title</label>
                    <input type="text" placeholder="Enter title" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Select Class</label>
                    <select className="form-control">
                        <option>Class 1</option>
                        <option>Class 2</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows={4} className="form-control"></textarea>
                </div>
                <button className="btn-primary">Assign</button>
            </form>
        </div>
    </div>
  );
};

export default AssignActivity;


