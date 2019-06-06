import React, { Component } from 'react';
import { Grid, FormControl, Select, MenuItem, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const FiltersContainer = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  background-color: #c0cde0;
  border-radius: 5px;
  padding: 10px;
`;

@inject('tasksStore')
class TasksFilters extends Component {
  filters$ = new Subject();

  constructor(props) {
    super(props);

    this.state = {
      status: props.tasksStore.filters.status,
      search: props.tasksStore.filters.search,
    };

    this.filters$
      .pipe(
        debounceTime(500),
      )
      .subscribe(filters => {
        props.tasksStore.updateFilters(filters);
      });
  }

  syncFilters = () => {
    const { status, search } = this.state;
    this.filters$.next({ status, search });
  }

  handleStatusFilterChange = e => {
    const status = e.target.value;
    this.setState({ status }, this.syncFilters);
  };

  handleSearchTermChange = e => {
    const search = e.target.value;
    this.setState({ search }, this.syncFilters);
  }

  render() {
    return (
      <FiltersContainer>
        <Grid
          justify="space-between" // Add it here :)
          container
        >
          <Grid item>
            <ControlContainer>
              <FormControl style={{ width: '220px' }}>
                <TextField
                  placeholder="Search..."
                  value={this.state.search}
                  onChange={this.handleSearchTermChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </ControlContainer>
          </Grid>

          <Grid item>
            <ControlContainer>
              <FormControl style={{ width: '220px' }}>
                <Select
                  value={this.state.status}
                  onChange={this.handleStatusFilterChange}
                  displayEmpty
                >
                  <MenuItem value="">No status filter</MenuItem>
                  <MenuItem value={'OPEN'}>Open</MenuItem>
                  <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
                  <MenuItem value={'DONE'}>Done</MenuItem>
                </Select>
              </FormControl>
            </ControlContainer>
          </Grid>
        </Grid>
      </FiltersContainer>
    );
  }
}

export default TasksFilters;
