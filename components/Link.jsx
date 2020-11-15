import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Link = (props) => {
  const router = useRouter();
  let className = props.children.props.className || '';
  if (router.pathname === props.href) {
    className = `${className} active`;
  }

  return <NextLink {...props}>{React.cloneElement(props.children, { className })}</NextLink>;
};

export default Link;