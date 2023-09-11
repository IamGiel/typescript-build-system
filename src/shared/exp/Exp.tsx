import React from 'react';
import data from './expJson.json';

export const Exp = () => {
  const camelCase = (chars: string) => {
    const out = chars.split().map((char, charId) => {
      return char.toLowerCase();
    });
    console.log('out ', out);
    return out.join('');
  };
  return (
    <>
      <h1>Show sections if keys exist</h1>
      <pre>{JSON.stringify(data)}</pre>
      {data &&
        Object.keys(data).map((item, dataIdx) => {
          return (
            <div className={`${camelCase(item)}-section`} key={dataIdx}>
              {item}
            </div>
          );
        })}
    </>
  );
};
