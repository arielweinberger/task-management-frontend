import React, { Component } from 'react';
import { TextField, FormControl, Button } from '@material-ui/core';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

@inject('tasksStore', 'routerStore')
class CreateTaskPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      errorMessage: null,
    };
  }

  handleSubmitTask = async () => {
    const { tasksStore, routerStore } = this.props;
    const { title, description } = this.state;

    try {
      await tasksStore.createTask(title, description);
      routerStore.push('/tasks');
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    return (
      <FormWrapper>
        <FormContainer>
          <h1>Create a new task</h1>
          <p>Provide information about the task you wish to complete.</p>

          { this.state.errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <FormControl fullWidth>
            <TextField
              label="Title"
              placeholder="Title"
              margin="normal"
              variant="outlined"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Description"
              placeholder="Description"
              multiline
              rows="8"
              margin="normal"
              variant="outlined"
              onChange={e => this.setState({ description: e.target.value })}
            />
          </FormControl>

          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmitTask}
          >
            CREATE TASK
          </Button>
        </FormContainer>
      </FormWrapper>
    );
  }
}

export default CreateTaskPage;
