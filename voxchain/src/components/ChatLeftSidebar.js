import React, { useState } from "react";

const ChatLeftSidebar = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);

  return (
    <div className="chat-leftsidebar me-lg-1 ms-lg-0">
      <div className="tab-content">
        <div
          className="tab-pane"
          id="pills-user"
          role="tabpanel"
          aria-labelledby="pills-user-tab"
        >
          <div>
            <div className="px-4 pt-4">
              <div className="user-chat-nav float-end">
                <div className="dropdown">
                  <a
                    href="/"
                    className="font-size-18 text-muted dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ri-more-2-fill"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="/">
                      Edit
                    </a>
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </div>
                </div>
              </div>
              <h4 className="mb-0">My Profile</h4>
            </div>

            <div className="text-center p-4 border-bottom">
              <div className="mb-4">
                <img
                  src="assets/images/user.jpg"
                  className="rounded-circle avatar-lg img-thumbnail"
                  alt=""
                />
              </div>
              <h5 className="font-size-16 mb-1 text-truncate">
                Patricia Smith
              </h5>
              <p className="text-muted text-truncate mb-1">
                <i className="ri-record-circle-fill font-size-10 text-success me-1 ms-0 d-inline-block"></i>{" "}
                Active
              </p>
            </div>
            <div className="p-4 user-profile-desc" data-simplebar>
              <div className="text-muted">
                <p className="mb-4">
                  If several languages coalesce, the grammar of the resulting
                  language is more simple and regular than that of the
                  individual.
                </p>
              </div>
              <div id="tabprofile" className="accordion">
                <div className="accordion-item card border mb-2">
                  <div className="accordion-header" id="about2">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#about"
                      aria-expanded="true"
                      aria-controls="about"
                    >
                      <h5 className="font-size-14 m-0">
                        <i className="ri-user-2-line me-2 ms-0 align-middle d-inline-block"></i>{" "}
                        About
                      </h5>
                    </button>
                  </div>
                  <div
                    id="about"
                    className="accordion-collapse collapse show"
                    aria-labelledby="about2"
                    data-bs-parent="#tabprofile"
                  >
                    <div className="accordion-body">
                      <div>
                        <p className="text-muted mb-1">Name</p>
                        <h5 className="font-size-14">Patricia Smith</h5>
                      </div>
                      <div className="mt-4">
                        <p className="text-muted mb-1">Email</p>
                        <h5 className="font-size-14">adc@123.com</h5>
                      </div>
                      <div className="mt-4">
                        <p className="text-muted mb-1">Location</p>
                        <h5 className="font-size-14 mb-0">California, USA</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade show active"
          id="pills-chat"
          role="tabpanel"
          aria-labelledby="pills-chat-tab"
        >
          <div>
            <div className="px-4 pt-4">
              <h4 className="mb-4">Chats</h4>
              <div className="search-box chat-search-box">
                <div className="input-group mb-3 rounded-3">
                  <span
                    className="input-group-text text-muted bg-light pe-1 ps-3"
                    id="basic-addon1"
                  >
                    <i className="ri-search-line search-icon font-size-18"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light"
                    placeholder="Search messages or users"
                    aria-label="Search messages or users"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <h5 className="mb-3 px-3 font-size-16">Recent</h5>
              <div className="chat-message-list px-2" data-simplebar>
                <ul className="list-unstyled chat-list chat-user-list">
                  <li>
                    <a href="/">
                      <div className="d-flex">
                        <div className="chat-user-img online align-self-center me-3 ms-0">
                          <img
                            src="assets/images/user.jpg"
                            className="rounded-circle avatar-xs"
                            alt=""
                          />
                          <span className="user-status"></span>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <h5 className="text-truncate font-size-15 mb-1">
                            Patrick Hendricks
                          </h5>
                          <p className="chat-user-message text-truncate mb-0">
                            Hey! there I'm available
                          </p>
                        </div>
                        <div className="font-size-11">05 min</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane"
          id="pills-groups"
          role="tabpanel"
          aria-labelledby="pills-groups-tab"
        >
          <div className="p-4">
            <div className="user-chat-nav float-end">
              <div
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Create group"
              >
                <button
                  type="button"
                  className="btn btn-link text-decoration-none text-muted font-size-18 py-0"
                  onClick={() => setShowGroupModal(true)}
                >
                  <i className="ri-group-line me-1 ms-0"></i>
                </button>
              </div>
            </div>
            <h4 className="mb-4">Groups</h4>
            {showGroupModal && (
              <div
                className="modal fade show"
                role="dialog"
                aria-labelledby="addgroup-exampleModalLabel"
                aria-hidden="true"
                style={{ display: "block" }}
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title font-size-16"
                        id="addgroup-exampleModalLabel"
                      >
                        Create New Group
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowGroupModal(false)}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body p-4">
                      <form>
                        <div className="mb-4">
                          <label
                            htmlFor="addgroupname-input"
                            className="form-label"
                          >
                            Group Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="addgroupname-input"
                            placeholder="Enter Group Name"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Group Members</label>
                          <div className="mb-3">
                            <button
                              className="btn btn-light btn-sm"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#groupmembercollapse"
                              aria-expanded="false"
                              aria-controls="groupmembercollapse"
                            >
                              Select Members
                            </button>
                          </div>
                          <div className="collapse" id="groupmembercollapse">
                            <div className="card border">
                              <div className="card-header">
                                <h5 className="font-size-15 mb-0">Contacts</h5>
                              </div>
                              <div className="card-body p-2">
                                <div
                                  style={{
                                    maxHeight: "150px",
                                    overflowY: "auto",
                                  }}
                                >
                                  <div>
                                    <div className="p-3 fw-bold text-primary">
                                      A
                                    </div>
                                    <ul className="list-unstyled contact-list">
                                      <li>
                                        <div className="form-check">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="memberCheck1"
                                            checked
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="memberCheck1"
                                          >
                                            Albert Rodarte
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="addgroupdescription-input"
                            className="form-label"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            id="addgroupdescription-input"
                            rows="3"
                            placeholder="Enter Description"
                          ></textarea>
                        </div>
                        <div className="mb-0">
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                          >
                            Create Group
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLeftSidebar;
