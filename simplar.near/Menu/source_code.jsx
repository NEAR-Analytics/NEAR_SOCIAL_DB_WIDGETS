if (!props.onSelect) { return "Please define onSelect" }

function onSelect(src, prs) { props.onSelect(src, prs) };

const homePage = props.homePage;
const topics = props.topics; // ["overview", "updates", "reports"]

// const capitalize = (words) => {
//   return words.split(" ").map( w => arr[i].charAt(0).toUpperCase() + arr[i].slice(1)).join(" ");
// }

return (
  <>
    <div class="">
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="#" class="nav-link" aria-current="page" onClick={() => onSelect(homePage, {})}>
            <i class="bi bi-house me-1" />
            Home
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            <i class="bi bi-mortarboard me-1" />
            Learn
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            <i class="bi bi-calendar-date me-1" />
            Events
          </a>
        </li>
        <li>
          <a
            href="#"
            class="nav-link link-dark btn-toggle"
            data-bs-toggle="collapse"
            data-bs-target="#collapse"
            aria-expanded="true"
          >
            <i class="bi bi-chat-right-text me-1" />
            Discuss
          </a>
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ps-4 small collapse show"
            id="collapse" >

            {
              topics.map(topic =>
                <li>
                  <a href="#" class="nav-link link-dark" onClick={() => onSelect("near/widget/NestedDiscussions", { identifier: topic })}>
                    {topic}
                  </a>
                </li>
              )
            }
            <li>
              <a href="#" class="nav-link link-dark">
                Updates
              </a>
            </li>
            <li>
              <a href="#" class="nav-link link-dark">
                Reports
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </>
);
