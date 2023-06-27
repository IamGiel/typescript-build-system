import React, { useEffect } from 'react';

interface IPepProfile {
  profileDetail: any;
  close: (val) => void;
}

export const PepProfile: React.FC<IPepProfile> = ({ profileDetail, close }) => {
  useEffect(() => {
    console.log(JSON.stringify(profileDetail));
  }, []);

  const closeThisPepProfile = () => {
    console.log('close this pep profile');
    close(true);
  };

  const lines = `rgb(203, 209, 226)`;

  return (
    <>
      <div
        className="pep-profile-container"
        style={{
          fontFamily: 'inter',
          display: 'flex',
          flexDirection: 'column',
          width: '1160px',
          height: '1114px',
          background: '#FFFFFF',
          opacity: '0.8',
          border: `1px solid ${lines}`,
          boxShadow:
            '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: '4px',
          padding: '41px',
        }}
      >
        <div
          className="profile-header-section"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '26px',
          }}
        >
          <div
            className="profile-header-title"
            style={{
              fontFamily: 'inter',
              fontStyle: 'normal',
              fontSize: '30px',
              lineHeight: '36px',
              fontWeight: '700',
            }}
          >
            PEP {profileDetail.firstName} {profileDetail.lastName}
          </div>
          <div
            className="profile-header-x-icon"
            style={{ cursor: 'pointer' }}
            onClick={() => closeThisPepProfile()}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.30304 1.30292C2.2403 0.365661 3.7599 0.365661 4.69715 1.30292L15.0001 11.6059L25.303 1.30292C26.2403 0.365661 27.7599 0.365661 28.6972 1.30292C29.6344 2.24018 29.6344 3.75977 28.6972 4.69703L18.3942 15L28.6972 25.3029C29.6344 26.2402 29.6344 27.7598 28.6972 28.697C27.7599 29.6343 26.2403 29.6343 25.303 28.697L15.0001 18.3941L4.69715 28.697C3.7599 29.6343 2.2403 29.6343 1.30304 28.697C0.365783 27.7598 0.365783 26.2402 1.30304 25.3029L11.606 15L1.30304 4.69703C0.365783 3.75977 0.365783 2.24018 1.30304 1.30292Z"
                fill="#656B7C"
              />
            </svg>
          </div>
        </div>

        <hr
          style={{
            backgroundColor: `${lines}`,
            height: '1px',
            border: 'none',
            marginBottom: '16px',
          }}
        />

        <div
          className="profile-bar-section"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '11px',
          }}
        >
          <div className="burger-icon" style={{ cursor: 'pointer' }}>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2 16C11.2 14.6745 12.2745 13.6 13.6 13.6H42.4C43.7254 13.6 44.7999 14.6745 44.7999 16C44.7999 17.3255 43.7254 18.4 42.4 18.4H13.6C12.2745 18.4 11.2 17.3255 11.2 16Z"
                fill="#656B7C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2 28C11.2 26.6745 12.2745 25.6 13.6 25.6H42.4C43.7254 25.6 44.7999 26.6745 44.7999 28C44.7999 29.3255 43.7254 30.4 42.4 30.4H13.6C12.2745 30.4 11.2 29.3255 11.2 28Z"
                fill="#656B7C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2 40C11.2 38.6745 12.2745 37.6 13.6 37.6H42.4C43.7254 37.6 44.7999 38.6745 44.7999 40C44.7999 41.3255 43.7254 42.4 42.4 42.4H13.6C12.2745 42.4 11.2 41.3255 11.2 40Z"
                fill="#656B7C"
              />
              <rect
                x="0.5"
                y="0.5"
                width="55"
                height="55"
                rx="3.5"
                stroke="#CBD1E2"
              />
            </svg>
          </div>
          <div
            className="download-section"
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '0px 10px',
              cursor: 'pointer',
            }}
          >
            <div
              className="download-icon"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: '5px',
              }}
            >
              <svg
                width="31"
                height="39"
                viewBox="0 0 31 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4999 15.4167V27.6667M15.4999 27.6667L9.37492 21.5417M15.4999 27.6667L21.6249 21.5417M25.7083 37.875H5.29159C3.03642 37.875 1.20825 36.0468 1.20825 33.7917V5.20833C1.20825 2.95317 3.03642 1.125 5.29159 1.125H16.6959C17.2374 1.125 17.7567 1.3401 18.1396 1.72299L29.1936 12.777C29.5765 13.1599 29.7916 13.6792 29.7916 14.2207V33.7917C29.7916 36.0468 27.9634 37.875 25.7083 37.875Z"
                  stroke="#5650D6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="download"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: '5px',
              }}
            >
              <span
                id="downloadhere"
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '20px',
                  color: '#5650D6',
                }}
              >
                Download
              </span>
            </div>
          </div>
        </div>

        <hr
          style={{
            backgroundColor: `${lines}`,
            height: '1px',
            border: 'none',
            marginBottom: '20px',
          }}
        />

        {/* eye ball from here, cause figma design for this is not "inspectable" */}

        {/* overview section */}

        <div
          className="overview-section"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-start',
            height: '480px',
            boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
            marginBottom: '36px',
          }}
        >
          <div
            className="prof-id-section"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: '158px',
              margin: '16px',
            }}
          >
            <div
              className="prof-id"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
                justifyContent: 'flex-start',
              }}
            >
              <label
                htmlFor="profile-id"
                style={{
                  color: '#007CB9',
                  fontSize: '14px',
                  fontFamily: 'inter',
                  fontWeight: '700',
                }}
              >
                PROFILE ID:
              </label>
              <span
                className="prof-label-values"
                style={{
                  display: 'flex',
                  fontSize: '18px',
                  fontFamily: 'inter',
                }}
              >
                0123456
              </span>
            </div>
            <div
              className="prof-type"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
                justifyContent: 'flex-start',
              }}
            >
              <label
                htmlFor="profile-id"
                style={{
                  color: '#007CB9',
                  fontSize: '14px',
                  fontFamily: 'inter',
                  fontWeight: '700',
                }}
              >
                TYPE:
              </label>
              <span
                className="prof-label-values"
                style={{
                  display: 'flex',
                  fontSize: '18px',
                  fontFamily: 'inter',
                }}
              >
                Entity
              </span>
            </div>

            <div
              className="prof-subsidiary"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
                justifyContent: 'flex-start',
              }}
            >
              <label
                htmlFor="profile-id"
                style={{
                  color: '#007CB9',
                  fontSize: '14px',
                  fontFamily: 'inter',
                  fontWeight: '700',
                }}
              >
                SUBSIDIARY:
              </label>
              <span
                className="prof-label-values"
                style={{
                  display: 'flex',
                  fontSize: '18px',
                  fontFamily: 'inter',
                }}
              >
                NO
              </span>
            </div>
          </div>
          <div
            className="overview-title"
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '0px 12px',
              borderBottom: `1px solid ${lines}`,
              borderTop: `1px solid ${lines}`,
            }}
          >
            <span
              className="overview-title"
              style={{
                fontWeight: '700',
                fontFamily: 'inter',
                fontSize: '18px',
                margin: '12px 0px',
              }}
            >
              OVERVIEW
            </span>
          </div>
          <div
            className="status-country-headers"
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '12px',
              fontWeight: '700',
              fontFamily: 'inter',
              fontSize: '16px',
              borderBottom: `1px solid ${lines}`,
            }}
          >
            <div
              className="head-titles"
              style={{ display: 'flex', width: '50%' }}
            >
              <span>STATUS</span>
            </div>
            <div
              className="head-titles"
              style={{ display: 'flex', width: '50%' }}
            >
              <span>COUNTRY/TERRITORY DETAILS</span>
            </div>
          </div>
          <div
            className="status-country-row"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div
              className="sub-section"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 12px',
                width: '50%',
                borderRight: `1px solid ${lines}`,
              }}
            >
              <div
                className="status-section-content"
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexDirection: 'column',
                  padding: '14px 0px',
                }}
              >
                <div
                  className="status-section-content-sub"
                  style={{
                    display: 'flex',
                    gap: '24px',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    className="status-section-content-sub-inner"
                    style={{ display: 'flex' }}
                  >
                    <div
                      className="watchlist"
                      style={{ fontWeight: '700', fontSize: '18px' }}
                    >
                      <span>Watchlist</span>
                    </div>
                    <div
                      className="status-icon"
                      style={{
                        fontSize: '12px',
                        display: 'flex',
                        padding: '0px 12px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          border: `1px solid ${lines}`,
                          padding: '2px',
                          borderRadius: '5px',
                        }}
                      >
                        ✅ Active
                      </span>
                    </div>
                  </div>
                  <div
                    className="status-section-content-sub"
                    style={{
                      display: 'flex',
                      padding: '0px 12px',
                      fontSize: '13px',
                      color: 'rgb(169 170 173)',
                      fontWeight: '800',
                    }}
                  >
                    <div className="watchlist">
                      <span>LAST REVIEWED: 7 NOV 2022</span>
                    </div>
                  </div>
                </div>
                <div
                  className="special-interest-entity"
                  style={{
                    display: 'flex',
                    margin: '0px 12px',
                    fontWeight: '700',
                    fontSize: '18px',
                  }}
                >
                  <span className="itemlist">
                    Special Interest Entity (SIE)
                  </span>
                </div>
                <div
                  className="special-interest-entity"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    margin: '0px 32px',
                  }}
                >
                  <span className="itemlist-sub" style={{ fontSize: '18px' }}>
                    Sanctions Control & Ownership
                  </span>
                  <span
                    style={{
                      border: `1px solid ${lines}`,
                      padding: '2px',
                      borderRadius: '5px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    ✅ Active
                  </span>
                </div>
                <div
                  className="special-entity-sublists-container"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div
                    className="special-interest-entity"
                    style={{
                      display: 'flex',
                      margin: '0px 62px',
                      fontSize: '18px',
                    }}
                  >
                    <span className="itemlists">
                      EU Related Minority & Ownership
                    </span>
                  </div>
                  <div
                    className="special-interest-entity"
                    style={{
                      display: 'flex',
                      margin: '0px 62px',
                      fontSize: '18px',
                    }}
                  >
                    <span className="itemlists">
                      UK Related Ownership Unknown
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="sub-section"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 12px',
                width: '50%',
                gap: '12px',
              }}
            >
              <div
                className="status-section-content"
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexDirection: 'column',
                  padding: '14px 0px',
                }}
              >
                <div
                  className="profile-label"
                  style={{ display: 'flex', fontSize: '18px' }}
                >
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize: '14px',
                      fontFamily: 'inter',
                      fontWeight: '700',
                      color: '#007CB9',
                    }}
                  >
                    REGISTRATION
                  </span>
                </div>
                <div
                  className="profile-value"
                  style={{ display: 'flex', fontSize: '18px' }}
                >
                  <span>India</span>
                </div>
              </div>

              <div
                className="status-section-content"
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexDirection: 'column',
                  padding: '14px 0px',
                }}
              >
                <div
                  className="status-section-header-name"
                  style={{
                    borderTop: `1px solid ${lines}`,
                    borderBottom: `1px solid ${lines}`,
                    padding: '12px 0px',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      fontWeight: '700',
                      fontFamily: 'inter',
                      fontSize: '16px',
                    }}
                  >
                    Dates
                  </span>
                </div>
                <div
                  className="profile-label"
                  style={{ display: 'flex', fontSize: '18px' }}
                >
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize: '14px',
                      fontFamily: 'inter',
                      fontWeight: '700',
                      color: '#007CB9',
                    }}
                  >
                    REGISTRATION
                  </span>
                </div>
                <div
                  className="profile-value"
                  style={{ display: 'flex', fontSize: '18px' }}
                >
                  <span>25 Jan 2017</span>
                </div>
              </div>
            </div>

            {/* <div className='country-section' style={{display:'flex',margin:'12px 0px', width:'50%'}}>
              <span style={{display:'flex', flexDirection:'column', fontWeight:'500', fontFamily:'inter', fontSize:'16px'}}>Country/Territory Details</span>
            </div> */}
          </div>
        </div>

        {/* names section */}

        <div
          className="name-section"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-start',
            height: '480px',
            boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
            border: `1px solid ${lines}`,
          }}
        >
          <div
            className="overview-title"
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '0px 12px',
              borderBottom: `1px solid ${lines}`,
            }}
          >
            <span
              className="overview-title"
              style={{
                fontWeight: '700',
                fontFamily: 'inter',
                fontSize: '18px',
                margin: '12px 0px',
              }}
            >
              NAMES
            </span>
          </div>

          {/* column headers */}

          <div className="name-section-content">
            <div
              className="name-section-col-headers"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 12px',
                borderBottom: `1px solid ${lines}`,
              }}
            >
              <div
                className="name-section-content"
                style={{
                  padding: '12px 0px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px',
                  justifyContent: 'space-evenly',
                  justifyItems: 'start',
                }}
              >
                <div className="name-section-header-name-top">
                  <span
                    style={{
                      fontSize: '14px',
                      fontFamily: 'inter',
                      fontWeight: '700',
                      color: '#007CB9',
                    }}
                  >
                    NAME
                  </span>
                </div>
                <div className="name-section-header-name-top">
                  <span
                    style={{
                      fontSize: '14px',
                      fontFamily: 'inter',
                      fontWeight: '700',
                      color: '#007CB9',
                    }}
                  >
                    SUFFIX
                  </span>
                </div>
                <div className="name-section-header-name-top">
                  <span
                    style={{
                      fontSize: '14px',
                      fontFamily: 'inter',
                      fontWeight: '700',
                      color: '#007CB9',
                    }}
                  >
                    ORIGINAL SCRIPT NAME
                  </span>
                </div>
                <div className="name-section-header-name-top">
                  <span
                    style={{
                      fontSize: '14px',
                      fontFamily: 'inter',
                      fontWeight: '700',
                      color: '#007CB9',
                    }}
                  >
                    LANGUAGE
                  </span>
                </div>
              </div>
            </div>

            <div
              className="name-section-col-sub-headers"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 12px',
                borderBottom: `1px solid ${lines}`,
                backgroundColor: '#F4F4F4',
              }}
            >
              <div
                className="name-section-content"
                style={{
                  padding: '12px 0px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px',
                  justifyContent: 'space-evenly',
                  justifyItems: 'start',
                }}
              >
                <div className="name-section-header-name-top">
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize: '20',
                      fontFamily: 'inter',
                      fontWeight: '600',
                      color: '#181818',
                    }}
                  >
                    Primary Name
                  </span>
                </div>
              </div>
            </div>

            <div
              className="name-section-col-sub-headers"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 12px',
                borderBottom: `1px solid ${lines}`,
                backgroundColor: '#F4F4F4',
              }}
            >
              <div
                className="name-section-content"
                style={{
                  padding: '12px 0px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px',
                  justifyContent: 'space-evenly',
                  justifyItems: 'start',
                  backgroundColor: '#F5F9FC',
                }}
              >
                <div className="name-section-header-name-top">
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize: '20',
                      fontFamily: 'inter',
                      fontWeight: '600',
                      color: '#181818',
                    }}
                  >
                    Trumphone limited
                  </span>
                </div>
                <div className="name-section-header-name-top">
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize: '20',
                      fontFamily: 'inter',
                      fontWeight: '600',
                      color: '#181818',
                    }}
                  >
                    Private Limited
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
