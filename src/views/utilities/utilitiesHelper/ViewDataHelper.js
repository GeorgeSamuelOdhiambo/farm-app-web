import PropTypes from 'prop-types';

import React from 'react';
import { Card, Divider, Grid, Paper, Typography } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';

const FlockInfoDisplay = ({ flockInfo }) => {
  const { id, data } = flockInfo;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SubCard
          sx={{
            backgroundColor: '#f0f0f0',
            mb: '20px'
          }}
          title={
            <Grid container spacing={3}>
              <Grid item xs={6} md={4}>
                <Typography variant="h4" gutterBottom>
                  Friendly Name: {data.friendlyName}
                </Typography>
                <Typography variant="subtitle1">Breed: {data.breed}</Typography>
                <Typography variant="subtitle1">Current Number: {data.number.currentNumber}</Typography>
                <Typography variant="subtitle1">Initial Number: {data.number.initialNumber}</Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="h4" gutterBottom>
                  Flock ID: {id}
                </Typography>
                <Typography variant="subtitle1">Hatch Date: {data.hatchDate}</Typography>
                <Typography variant="subtitle1">Age: {data.age}</Typography>
              </Grid>
            </Grid>
          }
        >
          <Paper style={{ height: '60%', width: '100%', overflowX: 'auto' }}>
            <Card
              sx={{
                // backgroundColor: '#f0f0f0',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Health Information
                  </Typography>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Grid item xs={12}>
                    <Typography variant="h6">Vaccination Information</Typography>
                    <ul>
                      {data.health.vaccination.map((vaccine, index) => (
                        <li key={index}>
                          {vaccine.date}: {vaccine.name} ({vaccine.howToAdminister})
                        </li>
                      ))}
                    </ul>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Illness Information</Typography>
                    <ul>
                      {data.health.illness && data.health.illness.length > 0 ? (
                        data.health.illness.map((illness, index) => (
                          <li key={index}>
                            {illness.date}: {illness.symptom} ({illness.medication})
                          </li>
                        ))
                      ) : (
                        <li>No illness records available</li>
                      )}
                    </ul>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Feeding Record
                  </Typography>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Grid item xs={12}>
                    <Typography variant="h6">Feeding Information</Typography>
                    <ul>
                      {data.feeding && data.feeding.length > 0 ? (
                        data.feeding.map((feeding, index) => (
                          <li key={index}>
                            {feeding.time.from} to {feeding.time.to}: {feeding.quantity.number} {feeding.quantity.unit} of {feeding.type}
                          </li>
                        ))
                      ) : (
                        <li>No feeding records available</li>
                      )}
                    </ul>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Production Information
                  </Typography>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        textAlign: 'center'
                      }}
                      variant="subtitle1"
                    >
                      Total Eggs: {parseInt(data.production.totalEggProduction).toLocaleString()}
                    </Typography>
                    <Typography variant="h6">Egg Production Information</Typography>
                    <ul>
                      {data.production.dailyEggsProduction && data.production.dailyEggsProduction.length > 0 ? (
                        data.production.dailyEggsProduction.map((dailyProduction, index) => (
                          <li key={index}>
                            {dailyProduction.date}: {dailyProduction.quantity} Eggs
                          </li>
                        ))
                      ) : (
                        <li>No eggs records available</li>
                      )}
                    </ul>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6">Weight Gain Information</Typography>
                    <ul>
                      {data.production.weight && data.production.weight.length > 0 ? (
                        data.production.weight.map((weight, index) => (
                          <li key={index}>
                            {weight.age}: {weight.weight} {weight.unit}
                          </li>
                        ))
                      ) : (
                        <li>No weight records available</li>
                      )}
                    </ul>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Mortality Record
                  </Typography>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        textAlign: 'center'
                      }}
                      variant="subtitle1"
                    >
                      Total Mortality: {parseInt(data.number.totalMortality)}
                    </Typography>
                    <Typography variant="h6">Mortality Information</Typography>
                    <ul>
                      {data.number.mortality && data.number.mortality.length > 0 ? (
                        data.number.mortality.map((mortality, index) => (
                          <li key={index}>
                            {mortality.date}: Number: {mortality.quantity} ({mortality.comment})
                          </li>
                        ))
                      ) : (
                        <li>No mortality records available</li>
                      )}
                    </ul>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Expenses Record
                  </Typography>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: 'center'
                      }}
                    >
                      Total Expenses: {parseInt(data.totalExpenses).toLocaleString()}/=
                    </Typography>
                    <Typography variant="h6">Feed Expenses</Typography>
                    <ul>
                      {data.expenses.feeds && data.expenses.feeds.length > 0 ? (
                        data.expenses.feeds.map((feeds, index) => (
                          <li key={index}>
                            {feeds.date}: Cost: {feeds.cost.toLocaleString()}/= ({feeds.type})
                          </li>
                        ))
                      ) : (
                        <li>No feed expenses records available</li>
                      )}
                    </ul>

                    <Typography variant="h6">Vaccine Expenses</Typography>
                    <ul>
                      {data.expenses.vaccine && data.expenses.vaccine.length > 0 ? (
                        data.expenses.vaccine.map((vaccine, index) => (
                          <li key={index}>
                            {vaccine.date}: Cost: {vaccine.cost.toLocaleString()}/= ({vaccine.type})
                          </li>
                        ))
                      ) : (
                        <li>No vaccine expenses records available</li>
                      )}
                    </ul>
                    <Typography variant="h6">Other Expenses</Typography>
                    <ul>
                      {data.expenses.other && data.expenses.other.length > 0 ? (
                        data.expenses.other.map((other, index) => (
                          <li key={index}>
                            {other.date}: Cost: {other.cost.toLocaleString()}/= ({other.type})
                          </li>
                        ))
                      ) : (
                        <li>No other expenses records available</li>
                      )}
                    </ul>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Returns Record
                  </Typography>
                  <Divider sx={{ my: 1.5, borderColor: 'black' }} />
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: 'center'
                      }}
                    >
                      Total Income: {parseInt(data.totalIncome).toLocaleString()}/=
                    </Typography>
                    <Typography variant="h6">Income Information</Typography>
                    <ul>
                      {data.income && data.income.length > 0 ? (
                        data.income.map((income, index) => (
                          <li key={index}>
                            {income.date}: Units: {income.unit} Total Price: {parseInt(income.totalPrice).toLocaleString()}/= (
                            {income.description})
                          </li>
                        ))
                      ) : (
                        <li>No return records available</li>
                      )}
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Paper>
        </SubCard>
      </Grid>
    </Grid>
  );
};

FlockInfoDisplay.propTypes = {
  flockInfo: PropTypes.object
};

export default FlockInfoDisplay;
