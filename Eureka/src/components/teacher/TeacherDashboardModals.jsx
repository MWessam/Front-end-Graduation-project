import React from 'react';

const TeacherDashboardModals = ({
  createOpen,
  updateOpen,
  deleteOpen,
  createForm,
  setCreateForm,
  updateForm,
  setUpdateForm,
  deleteTarget,
  onCreateSubmit,
  onUpdateSubmit,
  onConfirmDelete,
  closeAll
}) => {
  return (
    <>
      {/* Create Class Modal */}
      {createOpen && (
        <div className="teacher-modal" onMouseDown={closeAll} role="presentation">
          <div className="teacher-modal-content" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="teacher-modal-header">
              <h3>Create New Class</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAll} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>

            <form className="teacher-modal-body" onSubmit={onCreateSubmit}>
              <label className="teacher-field">
                <span>Class Name</span>
                <input
                  value={createForm.name}
                  onChange={(e) => setCreateForm((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </label>

              <label className="teacher-field">
                <span>Description</span>
                <textarea
                  rows={3}
                  value={createForm.description}
                  onChange={(e) => setCreateForm((p) => ({ ...p, description: e.target.value }))}
                />
              </label>

              <label className="teacher-field">
                <span>Subject</span>
                <input
                  value={createForm.subject}
                  onChange={(e) => setCreateForm((p) => ({ ...p, subject: e.target.value }))}
                  placeholder="Optional"
                />
              </label>

              <div className="teacher-field">
                <span>Class Color</span>
                <div className="teacher-color-row">
                  {[
                    { label: 'Green', value: '#22c55e' },
                    { label: 'Blue', value: '#3b82f6' },
                    { label: 'Purple', value: '#8b5cf6' },
                    { label: 'Orange', value: '#f97316' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`teacher-color-swatch ${createForm.color === opt.value ? 'active' : ''}`}
                      style={{ background: opt.value }}
                      title={opt.label}
                      onClick={() => setCreateForm((p) => ({ ...p, color: opt.value }))}
                    />
                  ))}
                </div>
              </div>

              <div className="teacher-modal-footer">
                <button type="button" className="teacher-btn" onClick={closeAll}>
                  Cancel
                </button>
                <button type="submit" className="teacher-btn teacher-btn-primary">
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Class Modal */}
      {updateOpen && (
        <div className="teacher-modal" onMouseDown={closeAll} role="presentation">
          <div className="teacher-modal-content" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="teacher-modal-header">
              <h3>Update Class Details</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAll} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>

            <form className="teacher-modal-body" onSubmit={onUpdateSubmit}>
              <label className="teacher-field">
                <span>Class Name</span>
                <input
                  value={updateForm.name}
                  onChange={(e) => setUpdateForm((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </label>

              <label className="teacher-field">
                <span>Class Location</span>
                <input
                  value={updateForm.location}
                  onChange={(e) => setUpdateForm((p) => ({ ...p, location: e.target.value }))}
                  required
                />
              </label>

              <label className="teacher-field">
                <span>Class Description</span>
                <textarea
                  rows={3}
                  value={updateForm.description}
                  onChange={(e) => setUpdateForm((p) => ({ ...p, description: e.target.value }))}
                />
              </label>

              <div className="teacher-modal-footer">
                <button type="button" className="teacher-btn" onClick={closeAll}>
                  Cancel
                </button>
                <button type="submit" className="teacher-btn teacher-btn-primary">
                  Update Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Class Modal */}
      {deleteOpen && (
        <div className="teacher-modal" onMouseDown={closeAll} role="presentation">
          <div className="teacher-modal-content teacher-modal-danger" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="teacher-modal-header">
              <h3>Delete Class</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAll} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="teacher-modal-body">
              <p className="teacher-danger-text">
                Are you sure you want to delete{' '}
                <strong>{deleteTarget?.name || 'this class'}</strong>? This action cannot be undone.
              </p>

              <div className="teacher-modal-footer">
                <button type="button" className="teacher-btn" onClick={closeAll}>
                  Cancel
                </button>
                <button type="button" className="teacher-btn teacher-btn-danger" onClick={onConfirmDelete}>
                  Delete Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherDashboardModals;
