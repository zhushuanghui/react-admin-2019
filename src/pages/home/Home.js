/*
 * @Author: your name
 * @Date: 2019-12-12 15:33:57
 * @LastEditTime : 2020-01-02 09:12:55
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share-bike-ms/src/pages/home/Home.js
 */

import React, { Component } from 'react'
import {reqStatistic} from '../../api';
import {  Statistic, Card, Row, Col, Icon } from 'antd';

export class Home extends Component {
    state={
        statistic:{}
    }

    componentDidMount (){
        // let data=await reqStatistic();
        // this.setState({
        //     statistic:data.data
        // })
    }

    render() {
        const {userCount,productCount,orderCount}=this.state.statistic;
        return (
            <div style={{ padding: '30px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card hoverable>
                  <Statistic
                   
                    title="userCount"
                    value={userCount}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<Icon type="arrow-up" />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card  hoverable>
                  <Statistic
                    title="productCount"
                    value={productCount}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<Icon type="arrow-down" />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable>
                  <Statistic
                    title="orderCount"
                    value={orderCount}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<Icon type="arrow-down" />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        )
    }
}

export default Home
