import tableIcon from "../assets/tableIcon.png";

// Toolbar.jsx
export default function CustomToolbar({ id }) {
  return (
    <div className="toolbar" id={`toolbar-${id}`}>
      <select className="ql-header" defaultValue="">
        <option value="1" />
        <option value="2" />
        <option value="" />
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-blockquote" />
      <img className="ql-insertTable" src={tableIcon}/>
    </div>
  );
}
