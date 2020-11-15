function Mother() {
    const [value, setValue] = useState(null)

    useEffect(() => {
        console.log("App", value)
        // value = 66
    });

    return (
        ...
        <Children property={setValue} />
        ...
    );
}

class Children(){

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.property(66)
        // define setValue = 66
    }
}