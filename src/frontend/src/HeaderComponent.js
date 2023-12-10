const HeaderComponent = ({ title, description }) => {
  return (
    <div className="bg-dark text-center p-5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80')" }}>
      <h1 className="text-white">{title}</h1>
      <p className="text-light">{description}</p>
    </div>
  );
};

export default HeaderComponent;
