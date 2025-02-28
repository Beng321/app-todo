export type ColumnProps = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Task = {
  id: number;
  content: string;
  createdAt: Date;
  idColumn: string;
};
