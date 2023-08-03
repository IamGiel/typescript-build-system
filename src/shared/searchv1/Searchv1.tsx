import qs from 'qs';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchMatchory,
  fetchMatchoryMachineToken,
  fetchMatchoryToken,
} from '../../service/apis';
import axios from 'axios';
import { CompanyList } from './subcomponents/CompanyList';
import { IMatchoryListQueryApiResponse } from '../../assets/interfaces/interfaces';
import { Loader } from '../../assets/reusables/loader/loader';
import debounce from 'lodash.debounce';
import { FilterSections } from './subcomponents/FilterSections';

export const Searchv1 = () => {
  const [query, setQuery] = useState('');
  const [queryId, setQueryId] = useState(null);
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [matchoryToken, setMatchoryToken] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef();
  const [currPage, setCurrPage] = useState<number>(1);
  const [checkedItems, setCheckedItems] = useState({});

  // Define the debounce function here
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleChange = (e: Event) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: Event) => {
    if (e.key === 'Enter' && query.trim()) {
      console.log('enter key is pressed ', e.target.value);
      const word = e.target.value;
      setTerms((prev) => [...prev, word]);
      setQuery('');
    }
  };

  useEffect(() => {
    const jsonSecretString = process.env.REACT_APP_MATCHORY_SECRET;
    const matchoryAuthSecret = JSON.parse(jsonSecretString);
    const params = {
      grant_type: matchoryAuthSecret.grant_type,
      client_id: matchoryAuthSecret.client_id,
      client_secret: matchoryAuthSecret.client_secret,
      scope: matchoryAuthSecret.scope,
    };
    const payload = qs.stringify(params);
    // First, get the Matchory access token using the getMatchoryAccTok method
    const getAccessToken = async () => {
      try {
        setLoading(true);
        const response = await fetchMatchoryToken(payload);
        const accessToken = response.access_token;

        console.log('accessToken: ', accessToken);

        const jsonString =
          process.env.REACT_APP_MATCHORY_EXCHANGE_MACHINE_PAYLOAD;
        const exchangeMachinePayload = JSON.parse(jsonString);
        exchangeMachinePayload.subject_token = accessToken;
        exchangeMachinePayload.subject_token_type =
          'urn:ietf:params:oauth:token-type:access_token';

        const exchangeMachineResponse = await fetchMatchoryMachineToken(
          exchangeMachinePayload
        );
        console.log('exchangeMachineResponse: ', exchangeMachineResponse);
        setMatchoryToken(exchangeMachineResponse.access_token);
        setLoading(false);
        setApiError(false);
      } catch (error) {
        setApiError(true);
        console.log('Error:', error);
        setLoading(false);
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    if (terms.length > 0) {
      postMatchoryCreateSearchQuery(matchoryToken);
    }
  }, [terms, matchoryToken]);

  const postMatchoryCreateSearchQuery = async (accessToken) => {
    console.log('searchWords: ', terms);

    setLoading(true);
    const wordsArr = terms.map((word) => ({
      term: word,
    }));
    console.log('wordsArr: ', wordsArr);
    if (wordsArr.length === 0) {
      // No need to make the API call if wordsArr is empty
      return;
    }
    if (wordsArr.length) {
      try {
        const payload = {
          access_token: accessToken,
          terms: wordsArr,
          type: 'product',
        };

        console.log('payload ', payload);
        const matchoryResponse = await axios.post('/matchory', payload, {
          baseURL: 'http://localhost:3002',
        });
        console.log('MAtchory response: ', matchoryResponse);
        if (
          matchoryResponse &&
          matchoryResponse.data &&
          matchoryResponse.data.data &&
          matchoryResponse.data.data.id
        ) {
          setApiError(false);
          setQueryId(matchoryResponse.data.data.id);
          queryListById(payload, matchoryResponse.data.data.id, page);
        }
      } catch (error) {
        setApiError(true);
        setLoading(false);
        console.log('API postMatchoryCreateSearchQuery error: ', error);
      }
    }
  };

  const queryListById = async (auth: any, seacrchId: string, page: number) => {
    console.log('searchid: ', seacrchId);
    try {
      setLoading(true);

      const payload = {
        tok: auth,
        page: page,
        perPage: 10,
        id: seacrchId,
      };
      console.log('queryListById payload: ', payload);

      // Make the API call to /matchory with a custom baseURL
      const responseList = await axios.post('/matchory/list-queries', payload, {
        baseURL: 'http://localhost:3002',
      });
      console.log('response responseList fm Matchory: ', responseList);
      if (responseList.data.included) {
        // setData((prevData) => [...prevData, ...responseList.data.included]);
        setData(responseList.data);
        setLoading(false);
      } else {
        console.log('response list NOT arived');
        setLoading(false);
        console.log('no data');
      }
      setApiError(false);
      // const finalFilter:any = {
      //   "locations": addCountryLabel(response.data.meta.aggregations.countries),
      //   "buyers": response.data.meta.aggregations.customers,
      //   "hscodes": response.data.meta.aggregations.classifications,
      // }
    } catch (error) {
      setApiError(true);
      setLoading(false);
      console.log(error);
    }
  };

  const handleScroll = debounce(() => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollThreshold = 50; // Adjust this value as needed
      if (scrollHeight - scrollTop <= clientHeight + scrollThreshold) {
        setCurrPage((prev) => prev + 1);
        const wordsArr = terms.map((word) => ({
          term: word,
        }));
        const payload = {
          access_token: matchoryToken,
          terms: wordsArr,
          type: 'product',
        };
        // Call queryListById with the captured value of currPage
        queryListById(payload, queryId, currPage + 1);
        // queryListById(payload, queryId);
      }
    }
  }, 300);

  const handleCheckedItemsChange = (checkedItems) => {
    // Update the checked items state in Searchv1 component
    console.log('checked items in searchv1: ', checkedItems);
    setCheckedItems(checkedItems);
  };

  useEffect(() => {
    console.log('container ref ', containerRef);
    console.log('on scroll bottom currpage is ', currPage);
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className="searchv1-main-container flex flex-col lg:flex-row w-[100%]">
      {/* {JSON.stringify(checkedItems, null, 4)} */}
      {data && data.meta && data.meta.aggregations && (
        <div className="filter-container p-4 bg-gray-100 p-[40px]">
          <div className="filter-header">
            <h1 className="h1name flex justify-left m-[12px]">Filters</h1>
          </div>
          <div>
            {Object.entries(data.meta.aggregations).map(
              ([filtername, filterData], idx) => (
                <div className="filter-section w-[100%] " key={idx}>
                  <FilterSections
                    filternameProp={filtername}
                    filterProp={filterData}
                    onCheckedItemsChange={handleCheckedItemsChange}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}

      <div className="search-section flex flex-col w-[fit-content] lg:flex-1 p-4 bg-gray-200 gap-[12px] items-center p-[40px]">
        <div className="border border-slate-500 rounded py-[2px] px-[12px] focus:outline-0">
          <button
            className="button-home font-inter text-[16px] font-[500] text-slate-700 focus:outline-0"
            onClick={() => navigate('/')}
          >
            Home
          </button>
        </div>
        <div className="label-container">
          <span className="font-inter text-[16px] font-[500] text-slate-700">
            Type a search here:
          </span>
        </div>
        <div className="search-container border border-slate-200 rounded px-[12px] py-[5px]">
          <div className="input-stuff relative">
            <input
              className="input-field focus:outline-0 text-[15px]"
              type="text"
              onChange={(e) => handleChange(e)}
              onKeyPress={handleKeyPress}
              disabled={!matchoryToken && loading}
            />
            {loading && (
              <span className="loaderdiv absolute left-[-5px] top-[-22px]">
                <Loader />
              </span>
            )}
          </div>
        </div>
        {/* <pre>{JSON.stringify(data.included, null,4)}</pre> */}
        {!apiError && (
          <div
            className={`${
              !(data && data.included) ? 'overflow-hidden' : 'overflow-scroll'
            } list-container border border-slate-200 rounded max-h-[450px] bg-gray-100`}
            ref={containerRef}
          >
            <CompanyList companies={data.included} isLoading={loading} />
          </div>
        )}
        {apiError && <span>Ops! something wrong...</span>}
      </div>
    </div>
  );
};
