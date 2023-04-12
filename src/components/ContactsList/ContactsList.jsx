import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export const ContactList = ({ data, handleDelete }) => {
  return (
    <ul className={css.list}>
      {data.map((contact, id) => (
        <li className={css.item} key={id}>
          <div className={css.wrap}>
            <span className={css.span}>
              {contact.name} : {contact.number}
            </span>
            <button
              className={css.btn}
              type="button"
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
