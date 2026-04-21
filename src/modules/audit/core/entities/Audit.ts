export interface AuditProps {
  id: string;
  name: string;
}

export class Audit {
  constructor(private props: AuditProps) {}

  getId(): string { return this.props.id; }
  getName(): string { return this.props.name; }
}
