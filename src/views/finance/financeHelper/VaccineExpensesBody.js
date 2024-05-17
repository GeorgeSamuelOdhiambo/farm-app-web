import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TableCell, TableRow, Table, TableHead, TableBody, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

const VaccineExpenseBody = ({ dataItem, sec, title, onPopup, check }) => {
  let totalCost = 0;

  return (
    <Grid key={dataItem.id} item xs={12} sm={check ? 12 : 6}>
      <SubCard
        title={dataItem.id}
        secondary={<SecondaryAction title={title} icon={<AddIcon />} onClickIcon={() => onPopup(dataItem.id)} />}
      >
        <Grid container direction="column" spacing={1}>
          <Grid container>
            <Grid item xs={12}>
              {dataItem[sec].length > 0 ? (
                <Paper
                  style={check ? { height: 'auto', width: '100%', overflowX: 'auto' } : { height: 200, width: '100%', overflowX: 'auto' }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Coast</TableCell>
                        <TableCell align="center">Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataItem[sec].map((dataItem2, index) => {
                        totalCost += dataItem2.cost;
                        return (
                          <TableRow key={index}>
                            <TableCell align="center">{dataItem2.date}</TableCell>
                            <TableCell align="center">{dataItem2.cost}</TableCell>
                            <TableCell align="center">{dataItem2.type}</TableCell>
                          </TableRow>
                        );
                      })}
                      <TableCell colSpan={1} />
                      <TableCell align="center">
                        <Typography
                          sx={{ textAlign: 'center', fontWeight: 'bold', letterSpacing: '2px', color: 'black' }}
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Total Ksh {totalCost}
                        </Typography>
                      </TableCell>
                      <TableCell colSpan={1} />
                    </TableBody>
                  </Table>
                </Paper>
              ) : (
                <Typography sx={{ textAlign: 'center' }} variant="overline" display="block" gutterBottom>
                  No data to Display
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </SubCard>
    </Grid>
  );
};

VaccineExpenseBody.propTypes = {
  dataItem: PropTypes.object.isRequired,
  onPopup: PropTypes.func.isRequired,
  sec: PropTypes.string,
  title: PropTypes.string,
  check: PropTypes.bool
};

export default VaccineExpenseBody;
