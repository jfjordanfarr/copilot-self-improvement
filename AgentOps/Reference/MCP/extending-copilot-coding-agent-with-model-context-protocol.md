# Extending Copilot coding agent with the Model Context Protocol (MCP) - GitHub Docs
Learn how to use the Model Context Protocol (MCP) to extend the capabilities of Copilot coding agent.

The Model Context Protocol (MCP) is an open standard that defines how applications share context with large language models (LLMs). MCP provides a standardized way to connect AI models to different data sources and tools, enabling them to work together more effectively.

You can use MCP to extend the capabilities of Copilot coding agent by connecting it to other tools and services.

The agent can use tools provided by local MCP servers. For example, the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) provides tools to interact with web pages and pull in additional context when executing on the requested task.

For more information on MCP, see [the official MCP documentation](https://modelcontextprotocol.io/introduction). For information on some of the currently available MCP servers, see [the MCP servers repository](https://github.com/modelcontextprotocol/servers/tree/main).

Note

*   Copilot coding agent only supports tools provided by MCP servers. It does not support resources or prompts.
*   Copilot coding agent currently only supports local MCP servers. To learn more about transport types, see the [official MCP documentation](https://modelcontextprotocol.io/docs/concepts/transports).

[Staying safe with MCP servers](#staying-safe-with-mcp-servers)
---------------------------------------------------------------

Once you've configured an MCP server, Copilot will be able to use the tools provided by the server autonomously, and will not ask for your approval before using them.

We recommend that you restrict your servers to read-only tools. You can use the `tools` configuration option to only expose known, safe tools to Copilot.

[About setting up MCP servers in a repository](#about-setting-up-mcp-servers-in-a-repository)
---------------------------------------------------------------------------------------------

As a repository administrator, you can configure MCP servers for use within your repository. This is done via a JSON-formatted configuration that specifies the details of the MCP servers you want to use. You enter the JSON configuration directly into the settings for the repository on GitHub.com.

Once MCP servers are configured for use within a repository, the tools specified in the configuration will be available to Copilot coding agent on each assigned task.

### [Creating your JSON MCP configuration](#creating-your-json-mcp-configuration)

You configure MCP servers using a special JSON format. The JSON must contain an `mcpServers` object, where the key is the name of the MCP server (for example, `playwright`), and the value is an object with the configuration for that MCP server.

JSON

```
{
  "mcpServers": {
    "MCP SERVER 1": {
      "command": "VALUE",
      "args": [ VALUES ],
      ...
    },
    "MCP SERVER 2": {
      "command": "VALUE",
      "args": [ VALUES ],
      ...
    },
    ...
  }
}

```


The configuration object can contain the following keys:

*   `command` (`string`): The command to run to start the MCP server.
*   `args` (`string[]`): The arguments to pass to the `command`.
*   `tools` (`string[]`): The tools from the MCP server to enable. You may be able to find a list of tools in the server's documentation, or in its code. We recommend that you allowlist specific tools, but you can also enable all tools by including `*` in the array.
*   `type` (`string`): Optional field. Copilot coding agent only accepts `"local"`.
*   `env` (`object`): The environment variables to pass to the server. This object should map the name of the environment variable that should be exposed to your MCP server to either of the following:
    *   The name of a GitHub Actions secret you have configured, beginning with `COPILOT_MCP_`.
    *   A string value.

[Example configurations](#example-configurations)
-------------------------------------------------

### [Example: Playwright](#example-playwright)

The [Playwright MCP server](https://github.com/microsoft/playwright-mcp) provides tools which allow Copilot to browse the internet.

JSON

```
{
  "mcpServers": {
    "playwright": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--init", "mcp/playwright"],
      "tools": ["*"]
    }
  }
}

```


### [Example: Sentry](#example-sentry)

The [Sentry MCP server](https://github.com/getsentry/sentry-mcp) gives Copilot authenticated access to exceptions recorded in [Sentry](https://sentry.io/).

JavaScript

```
// If you copy and paste this example, you will need to remove the comments prefixed with `//`, which are not valid JSON.
{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      // We can use the $SENTRY_HOST environment variable which is passed to
      // the server because of the `env` value below.
      "args": ["@sentry/mcp-server@latest", "--host=$SENTRY_HOST"],
      "tools": ["get_issue_details", "get_issue_summary"],
      "env": {
        // We can specify an environment variable value as a string...
        "SENTRY_HOST": "https://contoso.sentry.io",
        // or refer to a GitHub Actions secret with a name starting with
        // `COPILOT_MCP_`
        "SENTRY_AUTH_TOKEN": "COPILOT_MCP_SENTRY_AUTH_TOKEN"
      }
    }
  }
}

```


### [Example: Notion](#example-notion)

The [Notion MCP server](https://github.com/makenotion/notion-mcp-server) gives Copilot authenticated access to notes and other content from [Notion](https://notion.so/).

JavaScript

```
// If you copy and paste this example, you will need to remove the comments prefixed with `//`, which are not valid JSON.
{
  "mcpServers": {
    "notionApi": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        // We can use the $NOTION_API_KEY environment variable which is passed to
        // the server because of the `env` value below.
        "OPENAPI_MCP_HEADERS={\"Authorization\": \"Bearer $NOTION_API_KEY\", \"Notion-Version\": \"2022-06-28\"}",
       "mcp/notion"
      ],
      "env": {
        // The value of the `COPILOT_MCP_NOTION_API_KEY` secret will be passed to the
        // server command as an environment variable called `NOTION_API_KEY`
        "NOTION_API_KEY": "COPILOT_MCP_NOTION_API_KEY"
      },
      "tools": ["*"]
    }
  }
}

```


### [Example: Azure](#example-azure)

The [Azure MCP server](https://github.com/Azure/azure-mcp) creates a seamless connection between Copilot and key Azure services such as Azure Cosmos DB and the Azure Storage platform.

To use the Azure MCP with Copilot coding agent, you must update the repository's `copilot-setup-steps.yml` file to include an Azure login workflow step.

1.  Configure OIDC in a Microsoft Entra application, trusting GitHub. See [Use the Azure Login action with OpenID Connect](https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure-openid-connect).
    
2.  Add a `.github/workflows/copilot-setup-steps.yml` Actions workflow file in your repository if you do not already have one.
    
3.  Add an Azure login step to the `copilot-setup-steps` workflow job.
    
    YAML
    
    ```
on:
  workflow_dispatch:
permissions:
  id-token: write
  contents: read
jobs:
  copilot-setup-steps:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    environment: Copilot
    steps:
      - name: Azure login
        uses: azure/login@a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0
        with:
          client-id: $
          tenant-id: $
          subscription-id: $

```

    
    This configuration ensures the `azure/login` action is executed when Copilot coding agent runs.
    
4.  In your repository’s Copilot environment, add secrets for your `AZURE_CLIENT_ID`, `AZURE_TENANT_ID` and `AZURE_SUBSCRIPTION_ID`.
    
5.  Configure the Azure MCP server by adding an `azure` object to your MCP configuration.
    
    JSON
    
    ```
{
  "mcpServers": {
    "Azure MCP Server": {
      "command": "npx",
      "args": [
        "-y",
        "@azure/mcp@latest",
        "server",
        "start"
      ]
    }
  }
}

```

    

[Reusing your MCP configuration from Visual Studio Code](#reusing-your-mcp-configuration-from-visual-studio-code)
-----------------------------------------------------------------------------------------------------------------

If you have already configured MCP servers in VS Code, you can leverage a similar configuration for Copilot coding agent.

Depending on how VS Code is configured, you may be able to find your MCP settings in your repository's `.vscode/mcp.json` file, or in your machine's private `settings.json` file.

To adapt the configuration for Copilot coding agent, you will need to:

1.  Add a `tools` key for each MCP server, specifying which tools will be available to Copilot.
2.  If you've configured `inputs`, switch to using `env` directly.
3.  If you've configured an `envFile`, switch to using `env` directly.
4.  Update any references to `inputs` in your `args` configuration to refer to environment variables from `env` instead.

For more information on MCP in VS Code, see the [VS Code docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

[Adding your configuration to your repository](#adding-your-configuration-to-your-repository)
---------------------------------------------------------------------------------------------

Repository administrators can configure MCP servers by following these steps:

1.  On GitHub, navigate to the main page of the repository.
    
2.  Under your repository name, click **Settings**. If you cannot see the "Settings" tab, select the dropdown menu, then click **Settings**.
    
    ![Screenshot of a repository header showing the tabs. The "Settings" tab is highlighted by a dark orange outline.](https://docs.github.com/assets/cb-28260/images/help/repository/repo-actions-settings.png)
    
3.  In the "Code & automation" section of the sidebar, click **Copilot** then **Copilot agent**.
    
4.  Add your configuration in the **MCP configuration** section.
    
5.  Click **Save**.
    
    Your configuration will be validated to ensure proper syntax.
    
6.  If your MCP server requires a key or secret, add a secret to your Copilot environment. Only secrets with names prefixed with `COPILOT_MCP_` will be available to your MCP configuration. See [Setting up a Copilot environment for Copilot coding agent](#setting-up-a-copilot-environment-for-copilot-coding-agent).
    

### [Setting up a Copilot environment for Copilot coding agent](#setting-up-a-copilot-environment-for-copilot-coding-agent)

Some MCP servers will require keys or secrets. To leverage those servers in Copilot coding agent, you can add secrets to an environment for Copilot. This ensures the secrets are properly recognized and passed to the applicable MCP server that you have configured.

You must be a repository administrator to configure a Copilot environment for your repository.

1.  On GitHub, navigate to the main page of the repository.
    
2.  Under your repository name, click **Settings**. If you cannot see the "Settings" tab, select the dropdown menu, then click **Settings**.
    
    ![Screenshot of a repository header showing the tabs. The "Settings" tab is highlighted by a dark orange outline.](https://docs.github.com/assets/cb-28260/images/help/repository/repo-actions-settings.png)
    
3.  In the left sidebar, click **Environments**.
    
4.  Click **New environment**.
    
5.  Call the new environment `copilot` and click **Configure environment**.
    
6.  Under "Environment secrets", click **Add environment secret**.
    
7.  Give the secret a name beginning `COPILOT_MCP_`, add the secret value, then click **Add secret**.
    

[Validating your MCP configuration](#validating-your-mcp-configuration)
-----------------------------------------------------------------------

Once you've set up your MCP configuration, you should test it to make sure it is set up correctly.

1.  Create an issue in the repository, then assign it to Copilot.
2.  Wait a few seconds, and Copilot will leave an 👀 reaction on the issue.
3.  Wait a few more seconds, and Copilot will create a pull request, which will appear in the issue's timeline.
4.  Click the created pull request in the timeline, and wait until a "Copilot started work" timeline event appears.
5.  Click **View session** to open the Copilot coding agent logs.
6.  Click the ellipsis button (**...**) at the top right of the log viewer, then click **Copilot** in the sidebar.
7.  Click the **Start MCP Servers** step to expand the logs.
8.  If your MCP servers have been started successfully, you will see their tools listed at the bottom of the logs.

If your MCP servers require any dependencies that are not installed on the GitHub Actions runner by default, such as `uv` and `pipx`, or that need special setup steps, you may need to create a `copilot-setup-steps.yml` Actions workflow file to install them. For more information, see [Customizing the development environment for Copilot coding agent](https://docs.github.com/en/copilot/customizing-copilot/customizing-the-development-environment-for-copilot-coding-agent).

[Customizing the built-in GitHub MCP server](#customizing-the-built-in-github-mcp-server)
-----------------------------------------------------------------------------------------

The GitHub MCP server is enabled by default, giving Copilot access to GitHub data like issues and pull requests.

By default, the MCP server connects to GitHub with a specially scoped token that only has read-only access to the current repository.

If you want to allow Copilot to access data outside the current repository, you can give it a personal access token with wider access.

1.  Create a personal access token with the appropriate permissions. We recommend using a fine-grained personal access token, where you can limit the token's access to read-only permissions on specific repositories. For more information on personal access tokens, see [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
    
2.  On GitHub, navigate to the main page of the repository.
    
3.  Under your repository name, click **Settings**. If you cannot see the "Settings" tab, select the dropdown menu, then click **Settings**.
    
    ![Screenshot of a repository header showing the tabs. The "Settings" tab is highlighted by a dark orange outline.](https://docs.github.com/assets/cb-28260/images/help/repository/repo-actions-settings.png)
    
4.  In the "Code & automation" section of the sidebar, click **Copilot** then **Copilot agent**.
    
5.  Add your configuration in the **MCP configuration** section.
    
6.  Click **Save**.
    
7.  In the left sidebar, click **Environments**.
    
8.  Click the `copilot` environment.
    
9.  Under "Environment secrets", click **Add environment secret**.
    
10.  Call the secret `COPILOT_MCP_GITHUB_PERSONAL_ACCESS_TOKEN`, enter your personal access token in the "Value" field, then click **Add secret**.
    

[Best practices](#best-practices)
---------------------------------

*   Enabling third-party MCP servers for use may impact the performance of the agent and the quality of the outputs. Review the third-party MCP server thoroughly and ensure that it meets your organization’s requirements.
    
*   By default, Copilot coding agent does not have access to write MCP server tools. However, some MCP servers do contain such tools. Be sure to review the tools available in the MCP server you want to use. Update the `tools` field in the MCP configuration with only the necessary tooling.
    
*   Carefully review the configured MCP servers prior to saving the configuration to ensure the correct servers are configured for use.
    

[Further reading](#further-reading)
-----------------------------------

*   [Customizing the development environment for Copilot coding agent](https://docs.github.com/en/copilot/customizing-copilot/customizing-the-development-environment-for-copilot-coding-agent)
*   [Extending Copilot Chat with the Model Context Protocol (MCP)](https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-chat-with-mcp)