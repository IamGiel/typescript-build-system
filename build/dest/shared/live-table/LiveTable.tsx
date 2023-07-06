import React, { CSSProperties, useState } from 'react';
import styles from './LiveTable.module.scss';

export type IPEProfile = {
  id: string;
  firstName: string;
  lastName: string;
  address: any;
  domain: string;
  company: any;
  email: string;
};

export type ITableProps = {
  data: IPEProfile[];
  columnHeader: string[];
  onClickItem: (pedid) => void;
};

export const LiveTable: React.FC<ITableProps> = ({
  data,
  columnHeader,
  onClickItem,
}) => {
  // const [isHovered, setIsHovered] = useState(null);

  const tableColumnFonts: CSSProperties = {
    display: 'flex',
    padding: '16px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '16px',
    color: '#656B7C',
    minWidth: '254px',
    borderTop: 'none',
    borderBottom: '1px solid #E5E7EB',
  };

  const tableRowInThead: CSSProperties = {
    width: '100vw',
    height: '58px',
    display: 'flex',
    flexDirection: 'row',
  };

  const tableRowInBody: CSSProperties = {
    width: '254px',
    height: '52px',
    display: 'grid',
    gridAutoFlow: 'column',
    border: 'none',
  };

  const tdItem: CSSProperties = {
    display: 'flex',
    padding: '16px',
    width: '254px',
    cursor: 'pointer',

    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#656B7C',
    // height: '20px',
  };

  const tdItemName: CSSProperties = {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '20px',
    color: '#222429',
  };

  const tableContainer: CSSProperties = {
    height: '400px',
    overflow: 'auto',
  };

  const tableStyles: CSSProperties = {
    borderCollapse: 'collapse',
  };

  const frozenThead: CSSProperties = {
    position: 'sticky',
    top: '0',
    backgroundColor: '#ffffff',
  };

  const alternateBackgroundColor = (idx) => {
    if (idx % 2 === 0) {
      return styles['even'];
    } else {
      return styles['odd'];
    }
  };

  return (
    <div
      className={styles['table-container']}
      style={{
        ...tableContainer,
        ...{ scrollbarWidth: 'none', msScrollbarTrackColor: 'transparent' },
      }}
    >
      <table style={tableStyles}>
        <thead style={frozenThead}>
          <tr className={styles['table-row']} style={tableRowInThead}>
            {columnHeader.map((header, index) => (
              <th key={index} style={tableColumnFonts}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((item, index) => (
              <button
                key={index}
                className={alternateBackgroundColor(index)}
                style={{
                  ...tableRowInBody,
                }}
                // onMouseEnter={() => setIsHovered(index)}
                // onMouseLeave={() => setIsHovered(null)}
                onClick={() => onClickItem(item)}
              >
                <td
                  className={alternateBackgroundColor(index)}
                  style={{ ...tdItem, ...tdItemName }}
                >
                  {item.firstName} {item.lastName}
                </td>
                <td className={alternateBackgroundColor(index)} style={tdItem}>
                  {item.email}
                </td>
                <td className={alternateBackgroundColor(index)} style={tdItem}>
                  {item.address.address}
                </td>
                <td className={alternateBackgroundColor(index)} style={tdItem}>
                  {item.domain}
                </td>
                <td className={alternateBackgroundColor(index)} style={tdItem}>
                  {item.company.address.address}
                </td>
              </button>
            ))}
        </tbody>
      </table>
    </div>
  );
};
