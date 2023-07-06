import React, { CSSProperties } from 'react';

// just a static loader
export const PepComponentLoader = () => {
  const rowSkeletonStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '16px 12px',
    gap: '12px',
  };
  return (
    <div
      className="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '12px',
        // margin: '12px',
        background: '#F6F6FA',
      }}
    >
      <div
        style={{
          width: '266.67px',
          height: '32px',
          background: '#BAC1D8',
          borderRadius: '4px',
          margin: '12px',
          fontSize: '0px',
        }}
      >
        header skeleton
      </div>
      <div
        className="header-bar"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: '12px',
          margin: '12px',
        }}
      >
        <div
          className="searchbar-skeleton"
          style={{
            width: ' 333.33px',
            height: '40px',
            background: '#FFFFFF',
            borderRadius: ' 8px',
            fontSize: '0px',
          }}
        >
          Search bar
        </div>
        <div
          className="square-skeleton"
          style={{
            width: '40px',
            height: '42.11px',
            background: '#878EA5',
            borderRadius: '4px',
            fontSize: '0px',
          }}
        >
          square
        </div>
        <div
          className="square-skeleton"
          style={{
            width: '40px',
            height: '42.11px',
            background: '#878EA5',
            borderRadius: '4px',
            fontSize: '0px',
          }}
        >
          square
        </div>
      </div>
      <div
        className="table-skeleton"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {[1, 2, 3, 4, 5].map((rows, idx) => (
          <div className="row-skeleton" style={rowSkeletonStyle} key={idx}>
            <div
              className="thebox"
              style={{
                width: '40px',
                height: '32px',
                background: '#DDE0EB',
                borderRadius: '4px',
                fontSize: '0px',
              }}
            >
              box
            </div>
            <div
              className="lg-grow"
              style={{
                width: '276px',
                height: '32px',
                background: '#DDE0EB',
                borderRadius: '4px',
                fontSize: '0px',
              }}
            >
              lg-row
            </div>
            <div
              className="xl-row"
              style={{
                width: '518px',
                height: '32px',
                background: '#DDE0EB',
                borderRadius: '4px',
                fontSize: '0px',
              }}
            >
              xl-row
            </div>
            <div
              className="md-row"
              style={{
                width: '139px',
                height: '32px',
                background: '#DDE0EB',
                borderRadius: '4px',
                fontSize: '0px',
              }}
            >
              md-row
            </div>
            <div
              className="sm-row"
              style={{
                width: '97px',
                height: '32px',
                background: '#DDE0EB',
                borderRadius: '4px',
                fontSize: '0px',
              }}
            >
              sm-row
            </div>
          </div>
        ))}{' '}
      </div>
    </div>
  );
};
