import React from 'react';
import { Icon } from 'semantic-ui-react';
import { GoBackButtonProps } from './interface';

export default function GoBackButton({ goBack, label, classname }: GoBackButtonProps) {
  const goBackButtonClass = classname ?? 'order-detail__mainbox-buttonback';
  return (
    <section className={goBackButtonClass} onClick={() => goBack()}>
      <Icon name='arrow alternate circle left' color='blue' size='big' />
      <h6>{label}</h6>
    </section>
  );
}
