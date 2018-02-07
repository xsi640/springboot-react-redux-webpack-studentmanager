import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as UserAction from '../../actions/useraction'
import moment from 'moment'
import { Modal, Input, InputNumber, DatePicker, Radio, Alert, Button, Form } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group
import PropTypes from 'prop-types'
import './usereditor.scss'

class UserEditor extends Component {

    _user;

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            error: '',
            visible: false,
            loading: false,
            loginName: '',
            loginPwd: '',
            loginRePwd: '',
            realName: '',
            sex: 0,
            birthday: '',
            address: '',
            isModify: false,
        };

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps)
        if (nextProps.user) {
            this.props.onClose(nextProps.user);
            this.setState({
                visible: false,
                loading: false
            });
        }
        if (nextProps.error !== '') {
            this.setState({
                loading: false,
                error: nextProps.error
            });
        }
    }

    show(user) {
        this._user = user;
        if (typeof this._user === 'undefined') {
            this.setState({
                isModify: false,
                title: '新增用户',
                error: '',
                visible: true,
                loading: false,
                loginName: '',
                realName: '',
                loginPwd: '',
                loginRePwd: '',
                sex: 0,
                birthday: moment().add(-18, 'y'),
                address: '',
            });
        } else {
            this.setState({
                isModify: true,
                title: '修改用户',
                error: '',
                visible: true,
                loading: false,
                loginName: this._user.loginName,
                realName: this._user.realName,
                sex: this._user.sex,
                birthday: this._user.birthday,
                address: this._user.address,
                loginPwd: '',
                loginRePwd: '',
            });
        }
        console.log('show', this._user);
        // this.props.form.resetFields();
    }

    handleChange(name, value) {
        this.setState({ [name]: value });
    }

    handleOk(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true })
                if (typeof this._user === 'undefined') {
                    let { loginName, loginPwd, realName, sex, birthday, address } = this.state;
                    birthday = moment(birthday).format('YYYY-MM-DD HH:mm:ss');
                    this._user = { loginName, loginPwd, realName, sex, birthday, address };
                    this.props.save(this._user)
                } else {
                    let { loginPwd, realName, sex, birthday, address } = this.state;
                    this._user.loginPwd = loginPwd;
                    this._user.realName = realName;
                    this._user.sex = sex;
                    this._user.birthday = moment(birthday).format('YYYY-MM-DD HH:mm:ss');
                    this._user.address = address;
                    this.props.modify(this._user)
                }
            }
        });
    }

    handleCancel(e) {
        this.setState({ visible: false });
        this.props.onClose();
        e.preventDefault();
    }

    render() {
        const { title, error, visible, loading, loginName, realName, loginPwd, loginRePwd, sex, birthday, address, isModify } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        let pwdRules = isModify ? [] : [{
            required: true,
            message: '请输入登录密码。',
            whitespace: true,
        }, {
            min: 6,
            max: 32,
            message: '密码长度6~12个字符'
        }];
        return (
            <div>
                <Modal title={title} visible={visible} closable={false}
                    footer={[
                        <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" htmlType="submit" size="large" onClick={this.handleOk} loading={loading}>确定</Button>
                    ]} >
                    <Form>
                        <div className='alert'>
                            {
                                typeof error === 'string' && error !== '' ?
                                    <Alert message={error} type="error" closable={true} style={{ marginBottom: '20px' }} />
                                    : null
                            }
                        </div>
                        <div className='user'>
                            <FormItem label="登录名" {...formItemLayout}>
                                {
                                    getFieldDecorator('loginName', {
                                        rules: [{
                                            required: true,
                                            message: '请输入登录名。',
                                            whitespace: true
                                        }],
                                        initialValue: loginName,
                                    })(
                                        <Input placeholder="请输入登录名" disabled={isModify} onChange={e => this.handleChange('loginName', e.target.value)} />
                                        )
                                }
                            </FormItem>
                            <FormItem label="登录密码" {...formItemLayout}>
                                {
                                    getFieldDecorator('loginPwd', {
                                        rules: pwdRules
                                    })(
                                        <Input placeholder="请输入登录密码" type="password" onChange={e => this.handleChange('loginPwd', e.target.value)} />
                                        )
                                }
                            </FormItem>
                            <FormItem label="重复密码" {...formItemLayout}>
                                {
                                    getFieldDecorator('loginRePwd', {
                                        rules: [...pwdRules, {
                                            validator: (rule, value, callback) => {
                                                const form = this.props.form;
                                                if (value && value !== form.getFieldValue('loginPwd')) {
                                                    callback('两次密码输入不同！');
                                                } else {
                                                    callback();
                                                }
                                            }
                                        }]
                                    })(
                                        <Input placeholder="请重新输入登录密码" type="password" />
                                        )
                                }
                            </FormItem>
                            <FormItem label="真实姓名" {...formItemLayout}>
                                {
                                    getFieldDecorator('realName', {
                                        rules: [{
                                            required: true,
                                            message: '请输入真实姓名。'
                                        }],
                                        initialValue: realName
                                    })(
                                        <Input placeholder="请输入真实姓名" onChange={e => this.handleChange('realName', e.target.value)} />
                                        )
                                }
                            </FormItem>
                            <FormItem label="性别" {...formItemLayout}>
                                {
                                    getFieldDecorator('sex', {
                                        rules: [{
                                            type: 'number'
                                        }],
                                        initialValue: sex
                                    })(
                                        <RadioGroup name="sex" onChange={e => this.handleChange('sex', e.target.value)}>
                                            <Radio value={1}>男</Radio>
                                            <Radio value={2}>女</Radio>
                                            <Radio value={0}>保密</Radio>
                                        </RadioGroup>
                                        )
                                }
                            </FormItem>
                            <FormItem label="生日" {...formItemLayout}>
                                {
                                    getFieldDecorator('birthday', {
                                        initialValue: moment(birthday)
                                    })(
                                        <DatePicker format="YYYY-MM-DD" allowClear={false} onChange={e => this.handleChange('birthday', e.toDate())} />
                                        )
                                }
                            </FormItem>
                            <FormItem label="地址" {...formItemLayout}>
                                {
                                    getFieldDecorator('address', {
                                        rules: [{}],
                                        initialValue: address
                                    })(
                                        <Input placeholder="请输入地址" onChange={e => this.handleChange('address', e.target.value)} />
                                        )
                                }
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
            </div>
        )
    }
}

UserEditor.propTypes = {
    onClose: PropTypes.func,
}

const mapStateToProps = (state) => {
    return state.UserReducer;
}

const WrappedUserEditor = Form.create({ wrappedComponentRef: true })(UserEditor);
export default connect(mapStateToProps, UserAction, null, { withRef: true })(WrappedUserEditor)