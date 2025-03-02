import styles from './status.module.css'

export default function ReadStatusDropdown({ currentStatus }) {

  let statusColor; 

  if(currentStatus === "wantToRead") {
    statusColor = "red"
  } else if(currentStatus === "currentlyReading") {
     statusColor = "orange"
  } else {
     statusColor = "green"
  }




  return (
      <div
        id="read-status-dropdown"
        value={currentStatus}
        style={{ backgroundColor: statusColor }}
        className={styles.dropdown}
      >
     
      </div>
  );
}
