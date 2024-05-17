import PropTypes from 'prop-types';
import { ButtonBase, Link, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

// project imports
import Avatar from '../extended/Avatar';

const CardSecondaryAction = ({ onClickIcon, title, link, icon }) => {
  return (
    <Tooltip onClick={onClickIcon} title={title || 'Read More'} placement="left">
      <ButtonBase disableRipple>
        {!icon && (
          <Avatar component={Link} href={link} target="_blank" alt="GEO Logo" size="badge" color="primary" outline>
            <LanguageIcon />
          </Avatar>
        )}
        {icon && (
          <Avatar component={Link} href={link} target="_blank" size="badge" color="primary" outline>
            {icon}
          </Avatar>
        )}
      </ButtonBase>
    </Tooltip>
  );
};

CardSecondaryAction.propTypes = {
  icon: PropTypes.node,
  link: PropTypes.string,
  title: PropTypes.string,
  onClickIcon: PropTypes.func
};

export default CardSecondaryAction;
