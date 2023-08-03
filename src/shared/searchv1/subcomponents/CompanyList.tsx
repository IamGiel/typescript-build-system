import React, { useEffect, useState } from 'react';
import {
  IMatchoryListQueryApiResponse,
  IExtendedMatchoryIncluded,
} from '../../../assets/interfaces/interfaces';
import ScribbleSpinner from '../../../assets/reusables/scribble-spinner/scribbleSpinner';

interface ICompany {
  id: string;
  attributes: {
    uuid: string;
    address: {
      continent: string;
      country: string;
      locality: string;
      postalCode: string;
      postOfficeBoxNumber: string | null;
      region: string;
      streetAddress: string;
      subcontinent: string;
    };
    foundingDate: string;
    legalName: string;
    location: {
      latitude: number;
      longitude: number;
    };
    name: string;
    url: string;
  };
}

interface ICompanyListProps {
  companies: ICompany[];
  isLoading: boolean;
}

export const CompanyList: React.FC<ICompanyListProps> = ({
  companies,
  isLoading,
}) => {
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    console.log('comapnies ', companies);
    if (companies && companies.length) {
      setCompanyList((prev) => [...prev, ...companies]);
    }
  }, [companies]);

  return (
    <div className={`list-company-container flex flex-col bg-gray-100`}>
      {companyList &&
        companyList.length > 0 &&
        companyList.map((company, idx) => (
          <div
            key={idx}
            className="entry-list-item-details border border-slate-200 p-[12px] bg-gray-100"
          >
            {/* <pre>{JSON.stringify(companies)}</pre> */}
            <div className="entry flex">
              <span>Name: {company.attributes?.name}</span>
            </div>
            <div className="entry flex">
              <span>S. No: {idx}</span>
            </div>
            <div className="entry flex">
              <span>Continent: {company.attributes?.address?.continent}</span>
            </div>
            <div className="entry flex">
              <span>Country: {company.attributes?.address.country}</span>
            </div>
            <div className="entry flex">
              <span>Region: {company.attributes?.address.region}</span>
            </div>
            <div className="entry flex">
              <span>Locality: {company.attributes?.address.locality}</span>
            </div>
            <div className="entry flex">
              <span>
                Street Address: {company.attributes?.address.streetAddress}
              </span>
            </div>
            <div className="entry flex">
              <span>
                Coordinates: {company.attributes?.location.latitude}{' '}
                {company.attributes?.location.longitude}
              </span>
            </div>
            <div className="entry flex">
              <span>Founding Date: {company.attributes?.foundingDate}</span>
            </div>
            <div className="entry flex">
              <span>Legal Name: {company.attributes?.legalName}</span>
            </div>
            <div className="entry flex">
              <span>
                URL:{' '}
                <a
                  href={company.attributes?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.attributes?.url}
                </a>
              </span>
            </div>
          </div>
        ))}
      {isLoading && companyList && companyList.length > 0 && (
        <div className="loading-on-scroll-bottom flex flex-row justify-center items-center h-[50px] w-[100%]">
          <span className="loading-label flex text-slate-500 font-inter font-[500] text-[24px]">
            loading...
          </span>
        </div>
      )}
    </div>
  );
};
