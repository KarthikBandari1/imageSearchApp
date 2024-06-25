import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ImageList from "./components/ImageList";
import { fetchImages } from "./api";
import logo from "./logo.png";
import PaginationComponent from "./components/PaginationComponent";
import { Container, Grid, Skeleton, Card, Typography } from "@mui/material";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: false,
      query: "",
      page: 1,
      total: 0,
      submitted: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true, page: 1 }, () => {
      fetchImages().then((result) => {
        this.setState({
          images: result.data,
          total: result.total,
          loading: false,
        });
      });
    });
  }

  handleSearch = (query) => {
    this.setState({ loading: true, query, page: 1 }, () => {
      fetchImages(query).then((result) => {
        this.setState({
          images: result.data,
          total: result.total,
          loading: false,
          submitted: true,
        });
      });
    });
  };

  setPage = (page) => {
    const { query } = this.state;
    this.setState({ page, loading: true }, () => {
      fetchImages(query, page).then((result) => {
        const { data, total } = result;

        if (Array.isArray(data)) {
          this.setState({
            images: [...data],
            loading: false,
            total: parseInt(total, 10),
          });
        } else {
          this.setState({ loading: false });
        }
      });
    });
  };

  render() {
    const { loading, images, total, page, query, submitted } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="app-name font-effect-neon">Image Search App</h1>
          <img src={logo} alt="img" className="img-prop" />
        </header>
        <main>
          <SearchBar onSearch={this.handleSearch} />
          <div className="suggested">
            <h6 className="pt-2">Suggested:</h6>
            <button
              onClick={() => this.handleSearch("Beaches")}
              className="sug-but"
            >
              Beaches
            </button>
            <button
              onClick={() => this.handleSearch("Mountains")}
              className="sug-but"
            >
              Mountains
            </button>
            <button
              onClick={() => this.handleSearch("Flowers")}
              className="sug-but"
            >
              Flowers
            </button>

            <button
              onClick={() => this.handleSearch("Cities")}
              className="sug-but"
            >
              Cities
            </button>
          </div>
          {submitted && query && (
            <h2 className="show">Showing results for : {query}</h2>
          )}
          {loading ? (
            <Container>
              <Grid container spacing={2}>
                {Array.from(new Array(12)).map((_, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                    <Card>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={180}
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.3)" }}
                      />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <Skeleton sx={{ bgcolor: "rgba(0, 0, 0, 0.3)" }} />
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          ) : (
            <>
              {images.length > 0 ? (
                <ImageList images={images} />
              ) : (
                <div>No Images</div>
              )}
            </>
          )}
        </main>
        <PaginationComponent setPage={this.setPage} page={page} total={total} />
      </div>
    );
  }
}

export default App;
