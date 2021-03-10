import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Header from './Header';
import Table from './Table';

import '../styles/Main.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
        this.setStartDate = this.setStartDate.bind(this);
    }

    setStartDate(date) {
        this.setState({ date });
    }

    render() {
        return (
            <>
                <Header />
                <div className="top">
                    <p className="title">Privat Bank Rate</p>
                    <DatePicker
                        dateFormat="dd.MM.yyyy"
                        selected={this.state.date}
                        maxDate={new Date()}
                        onChange={date => this.setStartDate(date)} />
                </div>
                <Table date={this.state.date} />
            </>
        );
    }
}

export default Main;