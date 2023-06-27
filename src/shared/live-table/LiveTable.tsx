import React, { CSSProperties, useState } from 'react';
import styles from './LiveTable.module.scss';

export interface IPEProfile {
  id: string;
  firstName: string;
  lastName: string;
  address: any;
  domain: string;
  company: any;
  email: string;
}

export interface ITableProps {
  data: IPEProfile[];
  columnHeader: string[];
  onClickItem: (pedid) => void;
}

export const LiveTable: React.FC<ITableProps> = ({
  data,
  columnHeader,
  onClickItem,
}) => {
  const [isHovered, setIsHovered] = useState(null);

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
    background: '#FBFCFF',
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
    height: '20px',
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
          {data &&
            data.map((item, index) => (
              <tr
                key={index}
                className={styles['table-row-tr']}
                style={{
                  ...tableRowInBody,
                  backgroundColor:
                    index === isHovered ? 'lightgrey' : 'inherit',
                }}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => onClickItem(item)}
              >
                <td
                  className={styles['td-item']}
                  style={{ ...tdItem, ...tdItemName }}
                >
                  {item.firstName} {item.lastName}
                </td>
                <td className={styles['td-item']} style={tdItem}>
                  {item.email}
                </td>
                <td className={styles['td-item']} style={tdItem}>
                  {item.address.address}
                </td>
                <td className={styles['td-item']} style={tdItem}>
                  {item.domain}
                </td>
                <td className={styles['td-item']} style={tdItem}>
                  {item.company.address.address}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
