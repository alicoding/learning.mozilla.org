var React = require('react');
var loadBlogPosts = require('../../lib/blog-feed-loader');

var FeaturedPost = require('./FeaturedPost.jsx');
var LatestPosts = require('./LatestPosts.jsx');

var BlogSection = React.createClass({
  getDefaultProps: function() {
    return {
      loadBlogPosts: loadBlogPosts
    };
  },
  getInitialState: function() {
    return {
      featuredPost: {
        title: "",
        author: "",
        publishedDate: "",
        contentSnippet: "",
        link: ""
      },
      latestPosts: []
    }
  },
  componentDidMount: function() {
    this.props.loadBlogPosts(function(data) {
      if (!this.isMounted()) {
        return;
      }
      this.setState({
        featuredPost: data.featuredPost,
        latestPosts: data.latestPosts
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div className="blog-section">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2>On the Blog</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <FeaturedPost {...this.state.featuredPost} />
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <LatestPosts posts={this.state.latestPosts} />
            <a className="more" href="https://blog.webmaker.org/tag/teachtheweb/">See all blog posts</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BlogSection;
