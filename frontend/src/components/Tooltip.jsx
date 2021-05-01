import PropTypes from 'prop-types';
import React from 'react';
import { Popup } from 'semantic-ui-react';

const Tooltip = ({ content, children, inverted }) => {
  return <Popup inverted={inverted} content={content} trigger={children} />;
};
Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  inverted: PropTypes.bool,
};
export default Tooltip;
