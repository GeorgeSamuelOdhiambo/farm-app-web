import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

import LinkIcon from '@mui/icons-material/Link';
import FlockInfoDisplay from './utilitiesHelper/ViewDataHelper';
import { useEffect, useState } from 'react';
import Axios from 'api';
import { Grid, Typography } from '@mui/material';

const ViewFlockRecords = () => {
  const [flockData, setFlockData] = useState([]);
  const [mySmsApi, setPopupData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const apiCall = async () => {
      try {
        const result = await Axios.get(`getMyFlockRecords`);
        setFlockData(result.data);
        setIsLoading(false);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setPopupData(err.response.data.message);
        } else {
          setPopupData(err.message);
        }
        setIsLoading(false);
      }
    };

    apiCall();
  }, []);
  return (
    <MainCard
      title="Flock Records"
      secondary={
        <SecondaryAction
          icon={<LinkIcon fontSize="small" />}
          link="https://www.farmingug.com/poultry/kuroiler-chicken-farming-in-uganda/"
        />
      }
    >
      {flockData.length > 0 ? (
        flockData.map((flockInfo, index) => <FlockInfoDisplay key={index} flockInfo={flockInfo} />)
      ) : (
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant="subtitle2">{isLoading ? `loading...` : mySmsApi ? mySmsApi : `No Flock Record To Show`}</Typography>
        </Grid>
      )}
    </MainCard>
  );
};

export default ViewFlockRecords;
