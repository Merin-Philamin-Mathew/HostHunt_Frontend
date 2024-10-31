      {/* Table of amenities */}
                {/* <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Icon</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[1, 2, 3].map((item) => (
                            <TableRow key={item}>
                                <TableCell>{`Amenity ${item}`}</TableCell>
                                <TableCell>Type {item}</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Icon {item}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button isIconOnly color="" variant="light" aria-label="edit">
                                            <Edit className="h-4 w-4 text-slate-800" />
                                        </Button>
                                        <Button isIconOnly color="danger" variant="light" aria-label="delete">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <Switch
                                        defaultChecked
                                                // checked={data.isActive}
                                                // onChange={handleChange}
                                                name="is_active"
                                                size="md"
                                            >
                                            </Switch>
                                        
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> */}


                
const Table = ({ className, ...props }) => (
    <div className={`w-full overflow-auto ${className}`}>
      <table className="w-full caption-bottom text-sm" {...props} />
    </div>
  )
  
  const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
  ))
  
  const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
  ))
  
  const TableRow = React.forwardRef(({ className, ...props }, ref) => (
    <tr ref={ref} className={`border-b  transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`} {...props} />
  ))
  
  const TableHead = React.forwardRef(({ className, ...props }, ref) => (
    <th ref={ref} className={`h-12 px-4 text-left align-middle  text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
  ))
  
  const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td ref={ref} className={`p-4 whitespace-nowrap align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
  ))
  
  