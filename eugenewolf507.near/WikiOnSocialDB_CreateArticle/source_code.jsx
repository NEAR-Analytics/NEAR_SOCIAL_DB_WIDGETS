const addressForArticles = "wikiTest";
const authorForWidget = "eugenewolf507.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}
const initialBody = `# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b
`;

const errTextNoBody = "ERROR: no article Body",
  errTextNoId = "ERROR: no article Id",
  errTextDublicatedId = "ERROR: there is article with such name";

const initialCreateArticleState = {
  articleId: "",
  articleBody: initialBody,
  errorId: "",
  errorBody: "",
};

State.init(initialCreateArticleState);

const getArticleData = () => {
  const args = {
    articleId: state.articleId,
    author: accountId,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    timeCreate: Date.now(),
    body: state.articleBody,
    version: 0,
    navigation_id: null,
  };
  return args;
};

// === *** NEW DATA BASE *** ===
const newArticleCheck = {
  articleId: "FirstNewDBTest",
  author: accountId,
  lastEditor: accountId,
  timeLastEdit: Date.now(),
  timeCreate: Date.now(),
  body: "First New Data Base Structure Test",
  version: 0,
  navigation_id: null,
};

const composeData = () => {
  const data = {
    wikiTest2Article: {
      main: JSON.stringify(newArticleCheck),
    },
    index: {
      wikiTest2Article: JSON.stringify({
        key: "main",
        value: {
          type: "md",
        },
      }),
    },
  };
  return data;
};

const saveNewDBHandler = (e) => {
  console.log(composeData());
  console.log("Save to the New DB Clicked");
};

const getNewDBHandler = (e) => {
  const wikiTestData = Social.get(`eugenewolf507.near/**`, "final");
  console.log("wikiTestData eugenewolf507.near", wikiTestData);

  console.log(" ========== GET INDEX ARRAY FOR POSTS ========== ");
  const postsIndex = Social.index("wikiTest2Article", "main", {
    limit: 10,
    order: "desc",
    accountId: undefined,
  });
  console.log(postsIndex);
  console.log(" ========== GET 10 POSTS ========== ");
  postsIndex &&
    postsIndex.forEach(({ accountId, blockHeight }) => {
      const postData = Social.get(
        `${accountId}/wikiTest2Article/main`,
        blockHeight
      );
      console.log(JSON.parse(postData));
    });
};

// === SAVE HANDLER ===
const saveHandler = (e) => {
  State.update({
    ...state,
    errorId: "",
    errorBody: "",
  });
  if (state.articleId && state.articleBody) {
    // TODO check it automaticle
    const isArticleIdDublicated = false;

    if (!isArticleIdDublicated) {
      const newArticle = getArticleData();
      Social.set({
        [addressForArticles]: {
          articles: { [newArticle.articleId]: { ...newArticle } },
        },
      });
    } else {
      State.update({
        ...state,
        errorId: errTextDublicatedId,
      });
    }
  } else {
    if (!state.articleId) {
      State.update({
        ...state,
        errorId: errTextNoId,
      });
    }
    if (!state.articleBody) {
      State.update({ ...state, errorBody: errTextNoBody });
    }
  }
};

return (
  <>
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "create" }}
    />
    <div>
      <h1 className="mb-3"> Create Article</h1>
      <div>
        <div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={saveHandler}
          >
            Save Article
          </button>
          {/* === *** NEW DATA BASE *** === */}
          <CommitButton
            className="btn btn-warning"
            data={composeData}
            onClick={saveNewDBHandler}
          >
            Post
          </CommitButton>
          <button onClick={getNewDBHandler}>GET Data</button>
          {/* === *** NEW DATA BASE *** === */}
        </div>
        <div class="d-flex flex-column pt-3">
          <label for="inputArticleId">
            Input article id (case-sensitive, without spaces):
          </label>
          <label for="inputArticleId" class="small text-danger">
            {state.errorId}
          </label>
          <input
            className="form-control mt-2"
            id="inputArticleId"
            value={state.articleId}
            onChange={(e) => {
              State.update({
                ...state,
                articleId: e.target.value.replace(/\s+/g, ""),
              });
            }}
          />
        </div>
        <div class="d-flex flex-column pt-3">
          <label for="textareaArticleBody">
            Input article body (in makrdown format):
          </label>
          <label for="textareaArticleBody" class="small text-danger">
            {state.errorBody}
          </label>
          <div className="d-flex gap-2" style={{ minHeight: "300px" }}>
            <div className="w-50">
              <Widget
                src="mob.near/widget/MarkdownEditorIframe"
                props={{
                  initialText: initialBody,
                  onChange: (articleBody) => State.update({ articleBody }),
                }}
              />
            </div>
            <div className="w-50">
              <Widget
                src="mob.near/widget/SocialMarkdown"
                props={{ text: state.articleBody }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
