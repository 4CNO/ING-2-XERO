import {Component} from 'react';
import {Link} from 'react-router-dom';

export default class AppErrorBoundary extends Component{
  state={hasError:false};

  static getDerivedStateFromError(){
    return {hasError:true};
  }

  componentDidUpdate(previousProps){
    if(previousProps.resetKey!==this.props.resetKey&&this.state.hasError){
      this.setState({hasError:false});
    }
  }

  render(){
    if(this.state.hasError){
      return <main className="state">
        <p>No pudimos mostrar esta vista.</p>
        <Link className="btn" to="/productos">Volver al catálogo</Link>
      </main>;
    }

    return this.props.children;
  }
}
