# AGENTS.md

This repository is indexed by Graft. For locating code, understanding a flow, tracing callers, or scoping an edit, use the Graft MCP tools before grep or whole-file reads.

Available tools (DSH names): `mcp__graft__graft_find_code`, `mcp__graft__graft_find_all`, `mcp__graft__graft_file_api`, `mcp__graft__graft_trace_calls`, `mcp__graft__graft_repo_map`, `mcp__graft__graft_check_freshness`.

Load the `graft` skill for the routing table. One well-chosen call is usually enough; do not chain tools hoping for more.

The wiring graph is the source of truth. `graft build --deep` has not been run; conceptual search still works through the wiring graph.
