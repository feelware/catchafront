import { Button, CopyButton } from "@mantine/core";

interface Props {
  courseName: string,
  courseCode: string,
  studyPlan: string, // plan de estudio
  cursoTipo: "ELECTIVO" | "OBLIGATORIO",
}

const generateTagStyle = (color: string) => ({
  backgroundColor: color,
  borderRadius: "5px",
  padding: "2px 6px",
  marginRight: "6px",
  fontSize: 14
});

function CourseDisplayItem({ courseName, courseCode, studyPlan, cursoTipo }: Props) {

  return (
    <td style={{ display: "flex", flexDirection: "column" }}>
      <div>{courseName}</div>
      <div>
        <CopyButton value={courseCode}>
          {({ copied, copy }) => (
            <span
              style={generateTagStyle('#E6EAF4')}
              onClick={copy}>
              {courseCode}
              {copied && " (copiado)"}
            </span>
          )}
        </CopyButton>
        <span style={generateTagStyle('#F4EAE6')}>{studyPlan}</span>
        <span style={generateTagStyle('#E6F4E9')}>{cursoTipo}</span>
      </div>
    </td>
  );
}

export default CourseDisplayItem;
