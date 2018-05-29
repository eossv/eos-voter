// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Input, Message, Segment } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

export default class StakeForm extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      cpu_amount: 0,
      net_amount: 0
    };
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      error: false,
      [name]: value,
    });
  }, 300)

  onClick = debounce((e, { value }) => {
    const {
      actions,
      account,
      balance
    } = this.props;

    const {
      cpu_amount,
      net_amount
    } = this.state;

    const { setStakeWithValidation } = actions;

    setStakeWithValidation(balance, account, cpu_amount, net_amount)
  }, 300)

  render() {
    const {
      actions,
      validate,
      balance
    } = this.props;

    const {
      clearSettingsCache
    } = actions;

    const {
      error,
      cpu_amount,
      net_amount
    } = this.state;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Segment basic>
              <Form onSubmit={this.onSubmit}>
                <Form.Field
                  control={Input}
                  fluid
                  icon={(validate.STAKE === 'SUCCESS') ? 'checkmark' : 'x'}
                  label={t('stake_cpu_amount')}
                  loading={(validate.STAKE === 'PENDING')}
                  name="cpu_amount"
                  onChange={this.onChange}
                  defaultValue={cpu_amount}
                />
                <Form.Field
                  control={Input}
                  fluid
                  icon={(validate.STAKE === 'SUCCESS') ? 'checkmark' : 'x'}
                  label={t('stake_net_amount')}
                  loading={(validate.STAKE === 'PENDING')}
                  name="net_amount"
                  onChange={this.onChange}
                  defaultValue={net_amount}
                />
                {(validate.STAKE === 'FAILURE')
                  ? (
                    <Message negative>
                      <p>{t(validate.STAKE_ERROR)}</p>
                    </Message>
                  )
                  : ''
                }
                <Button
                  onClick={this.onClick}
                  content={t('stake_coins')}
                  color="green"
                />
              </Form>
            </Segment>
          )
        }
      </I18n>
    );
  }
}